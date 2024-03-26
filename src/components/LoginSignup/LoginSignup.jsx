import React, { useState, useEffect } from 'react';
import './LoginSignup.css';
import './newLogin.css'
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useAuth } from '../../contexts/authContext';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const initialState = { 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '',
        isAnon: false
    };
    const [formState, setFormState] = useState(initialState);
    const [action, setAction] = useState("Sign Up");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [statusMessage, setStatusMessage] = useState({status: null, message: ''});
    const { userLoggedIn } = useAuth();

    const isLogin = action === "Login";

    const onSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (!isSigningIn && formState.password) {
            setIsSigningIn(true);
            try {
                if (isLogin) {
                    await handleLogInFlow(formState);
                } else {
                    await handleCreateUser();
                }
            } catch (err) {
                setStatusMessage(err.message);
            } finally {
                setIsSigningIn(false);
            }
            setFormState(initialState);
            resetForm();
        }
    };

    useEffect(() => {
        if (statusMessage.status) {
            const timer = setTimeout(() => {
                setStatusMessage({ status: null, message: '' });
            }, 5000); // Clear status message after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    const handleCreateUser = async (e, isAnon) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        let data;
        if (isAnon) {
            data = { ...formState, isAnon: true };
        } else {
            data = formState;
        }
        axios.post('/add_user', data)
        .then((res) => {
            setStatusMessage({
                ...statusMessage, 
                status: 200,
                message: res.data.message
            })
        })
        .catch((err) => {
            setStatusMessage({
                ...statusMessage, 
                status: 400,
                message: err.response.data.message
            })
        })
    }

    const handleLogInFlow = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        axios.post('/login', formState)
        .then((res) => {
            setStatusMessage({
                ...statusMessage,
                status: 200,
                message: res.data.message
            })
        })
        .catch((err) => {
            setStatusMessage({
                ...statusMessage, 
                status: 400,
                message: err.response.data.message
            })
        })
    }

    const signInAnonymously = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const isAnon = true;
        setIsSigningIn(true);
        try {
            await handleCreateUser(e, isAnon);
        } catch (err) {
            setStatusMessage(err.message);
        } finally {
            setIsSigningIn(false);
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
                        <input 
                        type="firstname" 
                        placeholder='First Name' 
                        value={isSigningIn ? '' : formState.firstName}
                        onChange={(e) => setFormState({...formState, firstName: e.target.value})}/>
                        <input 
                        type="lastname" 
                        placeholder='Last Name'
                        value={isSigningIn ? '' : formState.lastName} 
                        onChange={(e) => setFormState({...formState, lastName: e.target.value})}/>
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="Email icon" />
                    <input 
                    type="email" 
                    placeholder='Email'
                    value={isSigningIn ? '' : formState.email} 
                    onChange={(e) => setFormState({...formState, email: e.target.value})} 
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password icon" />
                    <input 
                    type="password" 
                    placeholder='Password'
                    value={isSigningIn ? '' : formState.password} 
                    onChange={(e) => setFormState({...formState, password: e.target.value})} 
                    />
                </div>
                {
                    statusMessage.status && (
                    <span className={statusMessage.status === 200 ? "success-message": "error-message"}>{statusMessage.message}</span>
                )}
                <div className='or'>OR</div>
                <div className="googleSignIn">
                    <button className="sign-in-with-google" 
                    onClick={(e) => signInAnonymously()}>Sign in Anonymously</button>
                </div>
            </div>
            <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
            <div className="submit-container">
                <div className={isLogin ? "submit gray" : "submit"} 
                onClick={() => { onSubmit(); setAction('Sign Up') }}>Sign Up</div>
                <div className={!isLogin ? 'submit gray' : 'submit'} 
                onClick={() => { onSubmit(); setAction('Login') }}>Login</div>
            </div>
        </div>
    );
};

const resetForm = () => {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (firstNameInput) {
        firstNameInput.value = '';
    }
    if (lastNameInput) {
        lastNameInput.value = '';
    }
    if (emailInput) {
        emailInput.value = '';
    }
    if (passwordInput) {
        passwordInput.value = '';
    }
}

export default Login;
