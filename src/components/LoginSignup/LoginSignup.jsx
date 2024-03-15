import React, { useState } from 'react';
import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { doSignInWithGoogle, doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from '../../config/auth';
import { useAuth } from '../../contexts/authContext';
import { Navigate, Link } from 'react-router-dom';

const Login = () => {
    const [action, setAction] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLoggedIn } = useAuth();

    const isLogin = action === "Login";

    const onSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (!isSigningIn && email && password) {
            setIsSigningIn(true);
            await (isLogin ? 
                doSignInWithEmailAndPassword(email, password).catch(err => {
                    setErrorMessage(err.message)
                    setIsSigningIn(false);
                }) : doCreateUserWithEmailAndPassword(email, password)).catch(err => {
                    setErrorMessage(err.message)
                    setIsSigningIn(false);
                });
        }
    };

    const onGoogleSignIn = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithGoogle().catch(err => {
                setErrorMessage(err.message)
                setIsSigningIn(false);
            });
        }
    };

    return (
        <div className='container'>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {!isLogin && (
                    <div className="input">
                        <img src={email_icon} alt="Email icon" />
                        <input type="text" placeholder='Use Fake Email/Password' />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="Email icon" />
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password icon" />
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                {errorMessage && (
                    <span className='error-message'>{errorMessage}</span>
                )}
                <div className='or'>OR</div>
                <div className="googleSignIn">
                    <button className="sign-in-with-google" onClick={onGoogleSignIn}>Sign in with Google</button>
                </div>
            </div>
            <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
            <div className="submit-container">
                <div className={isLogin ? "submit gray" : "submit"} onClick={(e) => { onSubmit(e); setAction('Sign Up') }}>Sign Up</div>
                <div className={!isLogin ? 'submit gray' : 'submit'} onClick={(e) => { onSubmit(e); setAction('Login') }}>Login</div>
            </div>
        </div>
    );
};

export default Login;
