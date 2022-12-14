import React from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { ChatRoom } from './ChatRoom';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { getFirestore } from 'firebase/firestore';


const app = initializeApp({
    apiKey: "AIzaSyCJa7u85oURiOS9r9NKcBQcxmqU--9sfy0",
    authDomain: "sound-room-b3602.firebaseapp.com",
    projectId: "sound-room-b3602",
    storageBucket: "sound-room-b3602.appspot.com",
    messagingSenderId: "359845511014",
    appId: "1:359845511014:web:c2fced158a5e5417ad12a7",
    measurementId: "G-QMW9K7K7JJ"
});

const auth = getAuth(app);
const firestore = getFirestore(app);

const App = () => {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1>The Sound Room</h1>
                <SignOutButton auth={auth} />
            </header>

            <section>
                {user
                    ? <ChatRoom firestore={firestore} auth={auth} />
                    : <SignInButton auth={auth} />
                }
            </section>
        </div>
    );
}

export default App;
