import { Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import * as Tone from "tone";
import { PitchShift, Player, Volume } from "tone";

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
        const volumeInput = (document.getElementById('volume') as HTMLInputElement)?.value;
        const volumeVal = (Number(volumeInput ?? 5) * 5) - 50;
        const player = new Player(audioFiles[sound]);
        player.autostart = true;
        const volume = new Volume(volumeVal);
        const pitchShift = new PitchShift(Number(pitch));
        player.chain(volume, pitchShift, Tone.Destination);
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
                        <a href={`/#${newRoom}`} target="_BLANK">
                            Create a new room
                        </a>{" "}
                        then share the page URL for others to join your room
                    </p>
                </div>
                <div class={styles.sliders}>
                    <div class={styles.slider}>
                        <p>Pitch</p>
                        <span style="float: left;">💁‍♂️ Lower</span>
                        <span style="float: right;">Higher 💁‍♀️</span>
                        <input
                            type="range"
                            min={-100}
                            max={100}
                            onChange={(e) => setMyPitch(Number(e.currentTarget.value) / 10)}
                        />
                    </div>
                    <div class={styles.slider}>
                        <p>Volume</p>
                        <span style="float: left;">🔈 Quieter</span>
                        <span style="float: right;">Louder 🔊</span>
                        <input
                            id="volume"
                            type="range"
                            min={0}
                            max={10}
                            value={5}
                        />
                    </div>
                </div>
                <div class={styles.buttons}>
                    <button onClick={() => socket.send(`cheer;${getMyPitch()}`)}>
                        🎉
                    </button>{" "}
                    <button onClick={() => socket.send(`clap;${getMyPitch()}`)}>
                        👏
                    </button>
                    <button onClick={() => socket.send(`astonished;${getMyPitch()}`)}>
                        😲
                    </button>
                    <button onClick={() => socket.send(`cry;${getMyPitch()}`)}>😢</button>{" "}
                    <button onClick={() => socket.send(`laugh;${getMyPitch()}`)}>
                        😂
                    </button>
                    <button onClick={() => socket.send(`rofl;${getMyPitch()}`)}>
                        🤣
                    </button>{" "}
                    <button onClick={() => socket.send(`lol;${getMyPitch()}`)}>😜</button>
                    <button onClick={() => socket.send(`santa;${getMyPitch()}`)}>
                        🎅
                    </button>
                    <button onClick={() => socket.send(`woof;${getMyPitch()}`)}>
                        🐶
                    </button>{" "}
                    <button onClick={() => socket.send(`quack;${getMyPitch()}`)}>
                        🦆
                    </button>
                    <button onClick={() => socket.send(`boo;${getMyPitch()}`)}>👎</button>{" "}
                    <button onClick={() => socket.send(`wolf;${getMyPitch()}`)}>
                        🐺
                    </button>
                    <button onClick={() => socket.send(`drum;${getMyPitch()}`)}>
                        🥁
                    </button>{" "}
                    <button onClick={() => socket.send(`airhorn;${getMyPitch()}`)}>
                        📣
                    </button>
                    <button onClick={() => socket.send(`punch;${getMyPitch()}`)}>
                        👊
                    </button>
                    <button onClick={() => socket.send(`fart;${getMyPitch()}`)}>
                        💨
                    </button>{" "}
                    <button onClick={() => socket.send(`gong;${getMyPitch()}`)}>
                        <img src="/gong.png" />
                    </button>
                    <button onClick={() => socket.send(`shh;${getMyPitch()}`)}>
                        🤫
                    </button>
                    <button onClick={() => socket.send(`wow;${getMyPitch()}`)}>
                        <img src="/wow.png" />
                    </button>
                    <button onClick={() => socket.send(`lame;${getMyPitch()}`)}>
                        🤡
                    </button>
                </div>
            </header>
        </div>
    );
};

export default App;
