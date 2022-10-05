import { Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import * as Tone from "tone";
import { PitchShift, Player, Players } from "tone";

const audioLoaded = () => {
    console.log("audio files loaded");
};

const audioFiles: Record<string, string> = {
    astonished: "astonished.wav",
    boo: "boo.wav",
    cheer: "cheer.wav",
    clap: "clap.wav",
    cry: "cry.wav",
    drum: "drum.wav",
    airhorn: "airhorn.wav",
    punch: "punch.wav",
    lame: "lame.wav",
    laugh: "laugh.wav",
    quack: "quack.wav",
    wolf: "wolf.wav",
    woof: "woof.wav",
};

const App: Component = () => {
    const roomName = window.location.hash.substring(1);
    const [getRoomStatus, setRoomStatus] = createSignal("disconnected");
    const [getMyPitch, setMyPitch] = createSignal(0);

    const socket = new WebSocket(
        `wss://sound-room-server-production.up.railway.app/${roomName}`
    );

    socket.addEventListener("open", () => {
        setRoomStatus(`connected ${roomName}`);
    });
    socket.addEventListener("close", () => setRoomStatus("disconnected"));
    socket.addEventListener("message", async (event) => {
        if (Tone.getContext().state === "suspended") {
            Tone.start();
        }

        const blob: Blob = event.data;
        const msg: string = await blob.text();
        const [sound, pitch] = msg.split(";");
        const player = new Player(audioFiles[sound]);
        player.autostart = true;
        const shifter = new PitchShift(Number(pitch)).toDestination();
        player.connect(shifter);
    });
    socket.addEventListener("error", () => setRoomStatus("error"));

    const newRoom = crypto.randomUUID();

    return (
        <div class={styles.App}>
            <header class={styles.header}>
                <div class={styles.status}>{getRoomStatus()}</div>
                <h1>The Sound Room</h1>
                <div class={styles.inputs}>
                    <p>
                        <a href={`/#${newRoom}`}>Create a new room</a> then share the page
                        URL for others to join your room
                    </p>
                </div>
                <div class={styles.pitchBox}>
                    <p>Adjust your voice</p>
                    <span style="float: left;">Lower</span>
                    <span style="float: right;">Higher</span>
                    <input
                        type="range"
                        min={-50}
                        max={50}
                        onChange={(e) => setMyPitch(Number(e.currentTarget.value))}
                    />
                </div>
                <div class={styles.buttons}>
                    <button onClick={() => socket.send(`cheer;${getMyPitch()}`)}>
                        🎉
                    </button>{" "}
                    <button onClick={() => socket.send(`clap;${getMyPitch()}`)}>
                        👏
                    </button>
                    <button onClick={() => socket.send(`cheer;${getMyPitch()}`)}>
                        😢
                    </button>{" "}
                    <button onClick={() => socket.send(`laugh;${getMyPitch()}`)}>
                        🤣
                    </button>
                    <button onClick={() => socket.send(`cheer;${getMyPitch()}`)}>
                        🐶
                    </button>{" "}
                    <button onClick={() => socket.send(`quack;${getMyPitch()}`)}>
                        🦆
                    </button>
                    <button onClick={() => socket.send(`astonished;${getMyPitch()}`)}>
                        😲
                    </button>
                    <button onClick={() => socket.send(`boo;${getMyPitch()}`)}>👎</button>{" "}
                    <button onClick={() => socket.send(`wolf;${getMyPitch()}`)}>
                        🐺
                    </button>
                    <button onClick={() => socket.send(`drum;${getMyPitch()}`)}>
                        🥁
                    </button>{" "}
                    <button onClick={() => socket.send(`lame;${getMyPitch()}`)}>
                        🤡
                    </button>
                </div>
            </header>
        </div>
    );
};

export default App;
