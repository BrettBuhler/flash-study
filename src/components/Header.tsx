import React from 'react'
import '../styles/Header.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import flashLogo80 from '../images/icons8-lightning-80.png'

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({}) => {

    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleSignupClick = () => {
        navigate('/signup')
    }

    useEffect(() => {
        const handleScroll = () => {
          const header = document.querySelector('.header-main');
          if (header) {
            if (window.scrollY === 0) {
              header.classList.remove('scrolled');
            } else {
              header.classList.add('scrolled');
            }
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <header className="header-main">
            <div className="header-container">
                <div className="left-section">
                    <img src={flashLogo80} className='logo'/>
                    <h1 className="logo-text">Flash Study</h1>
                </div>
                <div className="right-section">
                    <button className="header-button" onClick={handleSignupClick}>Sign Up</button>
                    <button className="header-button" onClick={handleLoginClick}>Log In</button>
                </div>
            </div>
        </header>
    )
}

export default Header