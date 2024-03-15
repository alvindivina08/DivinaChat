import React, { useRef, useState }from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import "../../App.css";
import { doSignOut } from '../../config/auth';

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className='nav'>
        </nav>
    )
}

export default Header
