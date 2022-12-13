import { Auth } from "firebase/auth";

interface Props {
    auth: Auth;
}

export const SignOutButton = ({ auth }: Props) => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    )
};
