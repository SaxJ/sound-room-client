import { DocumentData } from "firebase/firestore";

interface Props {
    message: string;
    avatar: string;
};

export const ChatMessage = ({ message, avatar }: Props) => {
    const cmd = message.split(';')[0] ?? 'unknown';

    return (<>
        <div className="message">
            <p>{cmd}</p>
            <img src={avatar} alt="Avatar" />
        </div>
    </>);
};
