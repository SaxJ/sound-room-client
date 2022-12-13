interface Props {
    pitchChange: (pitch: number) => void;
    volumeChange: (volume: number) => void;
    handleMessage: (message: string) => void;
    pitch: number;
    volume: number;
}

export const SoundBoard = ({ pitchChange, handleMessage, volumeChange, pitch, volume }: Props) => {
    return (
        <>
            <div className="slider-container">
                <div className="pitch-slider">
                    <p>Pitch</p>
                    <span style={{float: 'left'}}>💁‍♂️ Lower</span>
                    <span style={{float: 'right'}}>Higher 💁‍♀️</span>
                    <input
                        value={pitch}
                        type="range"
                        min={-100}
                        max={100}
                        onChange={(e) => pitchChange(Number(e.currentTarget.value) / 10)}
                    />
                </div>
                <div className="volume-slider">
                    <p>Volume</p>
                    <span style={{float: 'left'}}>🔈 Quieter</span>
                    <span style={{float: "right"}}>Louder 🔊</span>
                    <input
                        id="volume"
                        type="range"
                        min={0}
                        max={10}
                        value={volume}
                        onChange={(e) => volumeChange(Number(e.currentTarget.value))}
                    />
                </div>
            </div>
            <div className="sound-board">
                <button onClick={() => handleMessage(`cheer;${pitch}`)}>
                    🎉
                </button>
                <button onClick={() => handleMessage(`clap;${pitch}`)}>
                    👏
                </button>
                <button onClick={() => handleMessage(`astonished;${pitch}`)}>
                    😲
                </button>
                <button onClick={() => handleMessage(`cry;${pitch}`)}>😢</button>{" "}
                <button onClick={() => handleMessage(`laugh;${pitch}`)}>
                    😂
                </button>
                <button onClick={() => handleMessage(`rofl;${pitch}`)}>
                    🤣
                </button>
                <button onClick={() => handleMessage(`lol;${pitch}`)}>😜</button>
                <button onClick={() => handleMessage(`santa;${pitch}`)}>
                    🎅
                </button>
                <button onClick={() => handleMessage(`woof;${pitch}`)}>
                    🐶
                </button>
                <button onClick={() => handleMessage(`quack;${pitch}`)}>
                    🦆
                </button>
                <button onClick={() => handleMessage(`boo;${pitch}`)}>👎</button>{" "}
                <button onClick={() => handleMessage(`wolf;${pitch}`)}>
                    🐺
                </button>
                <button onClick={() => handleMessage(`drum;${pitch}`)}>
                    🥁
                </button>
                <button onClick={() => handleMessage(`airhorn;${pitch}`)}>
                    📣
                </button>
                <button onClick={() => handleMessage(`punch;${pitch}`)}>
                    👊
                </button>
                <button onClick={() => handleMessage(`fart;${pitch}`)}>
                    💨
                </button>
                <button onClick={() => handleMessage(`gong;${pitch}`)} style={{
                    backgroundImage: 'url("gong.png")',
                    backgroundRepeat: 'no-repeat',
                }}>
                    &nbsp;
                </button>
                <button onClick={() => handleMessage(`lame;${pitch}`)}>
                    🤡
                </button>
            </div>
        </>
    );
}
