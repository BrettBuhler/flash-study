import React from 'react'
import '../styles/Header.css'
import axios from 'axios'

interface HeaderProps {
    title: string
    tagline: string
    imageUrl: string
}

const Header: React.FC<HeaderProps> = ({ title, tagline, imageUrl}) => {
    
    const testLogout = async () => {
        try {
            const response = await axios.get('/api/logout')
            console.log(response.data)
        } catch (error) {
            console.log('catch')
            console.error(error)
        }
    }

    const testLogin = async () => {
        const testEmail: string = 'brettbuhler@yahoo.com'
        const testPassword: string = 'goodpassword123'
        try {
            const response = await axios.post('/api/login', {
                email: testEmail,
                password: testPassword
            })
            console.log(response.data)
            if (response.data.user){
                window.location.href = '/dashboard'
            } else {
                console.log('testLogin Error')
            }
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <header className="top-bar">
            <div className="container">
                <div className="left-section">
                    <h1 className="logo">Flash Study</h1>
                </div>
                <div className="right-section">
                    <button className="button">Sign Up</button>
                    <button className="button" onClick={testLogin}>Log In</button>
                    <button onClick={testLogout}>Log out</button>
                </div>
            </div>
        </header>
    )
}

export default Header