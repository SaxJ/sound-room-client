import { Auth } from "firebase/auth";
import { addDoc, collection, Firestore, query, serverTimestamp, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { PitchShift, Player, Volume, ToneAudioBuffers } from "tone";
import * as Tone from "tone";
import { ChatMessage } from "./ChatMessage";
import { CreateRoomLink } from "./CreateRoomLink";
import { SoundBoard } from "./SoundBoard";

const audioFiles: Record<string, string> = {
    astonished: "astonished.wav",
    boo: "boo.wav",
    cheer: "cheer.wav",
    clap: "clap.wav",
    cry: "cry.wav",
    drum: "drum.wav",
    airhorn: "airhorn.wav",
    punch: "punch.wav",
    fart: "fart.wav",
    lame: "lame.wav",
    laugh: "laugh.wav",
    rofl: "rofl.wav",
    lol: "lol.wav",
    santa: "santa.wav",
    quack: "quack.wav",
    wolf: "wolf.wav",
    woof: "woof.wav",
    gong: "gong.wav",
    shh: "shh.wav",
    wow: "wow.wav",
};

interface Props {
    firestore: Firestore;
    auth: Auth;
}

export const ChatRoom = ({ firestore, auth }: Props) => {
    const [buffers, setAudioBuffers] = useState<ToneAudioBuffers | null>(null);

    useEffect(() => {
        const samples = new ToneAudioBuffers(audioFiles, () => {
            setAudioBuffers(samples);
        });
    }, []);

    const roomName = window.location.hash.substring(1);

    const messagesCollection = collection(firestore, 'messages');
    const messageQuery = query(messagesCollection, where('room', '==', roomName));

    const [pitch, setPitch] = useState(0);
    const [volume, setVolume] = useState(5);
    const [snapshot, ,] = useCollection(messageQuery);

    useEffect(() => {
        snapshot?.docChanges().filter(doc => doc.type === 'added').forEach(doc => {
            const [soundMessage, pitchMessage] = doc.doc.get('text').split(";");

            const volumeInput = (document.getElementById('volume') as HTMLInputElement)?.value;
            const volumeVal = (Number(volumeInput) * 5) - 50
            const player = new Player(buffers?.get(soundMessage));
            player.autostart = true;
            const volumeNode = new Volume(volumeVal);
            const pitchShift = new PitchShift(Number(pitchMessage));
            player.chain(volumeNode, pitchShift, Tone.Destination);
        })
    }, [snapshot, buffers])

    const sendMessage = (messageText: string) => {
        if (auth.currentUser === null) {
            return;
        }

        const { uid, photoURL } = auth.currentUser;
        addDoc(messagesCollection, {
            text: messageText,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
            room: roomName,
            localTime: (new Date()).getTime(),
        });
    }

    if (buffers === null) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }

    if (!roomName) {
        return (
            <main>
                <CreateRoomLink />
            </main>
        );
    }

    const messageFeed = snapshot?.docs?.sort((a, b) => {
        const at = a.get('localTime') ?? 0;
        const bt = b.get('localTime') ?? 0;
        return bt - at;
    })

    return (<>
        <main>
            <div className="history">
                {messageFeed && messageFeed.map((msg) => <ChatMessage key={msg.id} message={msg.get('text')} avatar={msg.get('photoURL')} />)}
            </div>
            <SoundBoard
                pitchChange={setPitch}
                volumeChange={setVolume}
                handleMessage={sendMessage}
                pitch={pitch}
                volume={volume} />
        </main>
    </>)

};
