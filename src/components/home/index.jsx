import React, { useRef, useState, useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import "../../App.css";
import "../../AppMedia.css"

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

const Filter = require('bad-words')
const filter = new Filter(); 

const Home = () => {
    const { currentUser } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            setLoggedIn(true);
        } else {
            navigate('/login')
        }
    }, [currentUser, navigate]);

    return (
        <ChatRoom loggedIn={loggedIn} />
    );
}

function cleanHacked(string) {
    try {
        return filter.clean(string);
    } catch {
        const joinMatch = filter.splitRegex.exec(string);
        const joinString = (joinMatch && joinMatch[0]) || '';
        return string.split(filter.splitRegex).map((word) => {
            return filter.isProfane(word) ? filter.replaceWord(word) : word;
        }).join(joinString);
    }
}

function ChatRoom() {
    let filteredWords;
    const dummy = useRef(null);
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy("createdAt"), limitToLast(30));
    const [ messages ] = useCollectionData(q, { idField: "id" });
    const [formValue, setFormValue] = useState('');

    if (formValue) {
        filteredWords = cleanHacked(formValue);
    }

    useEffect(() => {
        if (dummy.current && messages && messages.length > 0) {
            const timeoutId = setTimeout(() => {
                dummy.current.scrollIntoView({ behavior: 'smooth'});
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        await addDoc(messagesRef, {
            text: filteredWords,
            createdAt: serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
    };

    const handleInputChange = (e) => {
        setFormValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };
  
    return (
      <>
        <div className='App'>

            <header>
                <SignOut />
            </header>
            <div className="message-body">
    
            {messages && messages.map(msg => <ChatMessage key={msg.uid} message={msg} />)}
            <div ref={dummy}></div>
    
            </div>
    
            <form onSubmit={sendMessage}>
    
                <textarea
                    value={formValue}
                    onChange={handleInputChange}
                    placeholder="Message"
                    style={{ minHeight: '50px', maxHeight: '200px', width: '100%' }} // Set min and max height as desired
                />
                <button type="submit" disabled={!formValue}>Send</button>
    
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