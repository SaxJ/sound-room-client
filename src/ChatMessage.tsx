interface Props {
    message: string;
    avatar: string;
};

const emoji: { [key: string]: string } = {
    astonished: "😲",
    boo: "👎",
    cheer: "🎉",
    clap: "👏",
    cry: "😢",
    drum: "🥁",
    airhorn: "📣",
    punch: "👊",
    fart: "💨",
    lame: "🤡",
    laugh: "😂",
    rofl: "🤣",
    lol: "😜",
    santa: "🎅",
    quack: "🦆",
    wolf: "🐺",
    woof: "🐶",
    gong: "🟤",
    shh: "🤫",
    wow: "🤯",
};

export const ChatMessage = ({ message, avatar }: Props) => {
    const cmd = message.split(';')[0] ?? 'unknown';

    return (<>
        <div className="message">
            <span className="emoji">{emoji[cmd]}</span>
            <img src={avatar} alt="Avatar" />
        </div>
    </>);
};
