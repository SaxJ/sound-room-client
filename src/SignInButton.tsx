import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface Props {
    auth: Auth;
}

export const SignInButton = ({ auth }: Props) => {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <>
            <p>
                You need to sign in with Google to use this app.
            </p>
            <button onClick={signInWithGoogle} className="sign-in"></button>
        </>
    )
};
