import React, { useRef, useState, useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import "../../App.css";

import {
  collection,
  orderBy,
  query,
  limitToLast,
  serverTimestamp,
  addDoc
} from "firebase/firestore";
import defaultAvatar from '../Assets/defaultavatar.jpg'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, db } from "../../config/firebase";
import { doSignOut } from '../../config/auth';

const Home = () => {
    const { currentUser } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setLoggedIn(true);
        }
    }, [currentUser]);

    return (
        <ChatRoom loggedIn={loggedIn} />
    );
}

function ChatRoom() {
    const dummy = useRef(null);
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy("createdAt"), limitToLast(30));
    const [ messages ] = useCollectionData(q, { idField: "id" });
    const [formValue, setFormValue] = useState('');

    useEffect(() => {
        if (dummy.current) {
            setTimeout(() => {
                dummy.current.scrollIntoView({ behavior: 'smooth'});
            }, 100);
        }
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
    };
  
    return (
      <>
        <div className='App'>

            <header>
                <SignOut />
            </header>
            <div className="message-body">
    
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <div ref={dummy}></div>
    
            </div>
    
            <form onSubmit={sendMessage}>
    
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message" />
            <button type="submit" disabled={!formValue}>Sned</button>
    
            </form>

        </div>
      </>
    );
}
  
function SignOut() {
    const navigate = useNavigate()

    return auth.currentUser && (
        <button className="sign-out" onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>Sign Out</button>
    )

}
  
function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img alt="Avatar" src={photoURL || defaultAvatar} />
        <p>{text}</p>
      </div>
    </>)
}

export default Home