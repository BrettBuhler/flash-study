import React, { useState } from 'react';
import '../styles/TopBar.css';
import SideBar from './SideBar';
import axios from 'axios';
import logo from '../images/icons8-lightning-80.png'

interface TopBarProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}

const TopBar: React.FC<TopBarProps> = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
        const response = await axios.get('/api/logout')
        console.log(response.status)
        setUser({})
        window.location.href = '/'
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div className='top-bar-main'>
      <div className="topbar-container">
        <div className="hamburger-menu" onClick={handleMenuClick}>
          <div className={`line ${isMenuOpen ? 'line-open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'line-open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'line-open' : ''}`}></div>
        </div>
        <div className='title-container'>
          <img src={logo} alt='Flash Study Logo' className='top-bar-logo'/>
          <div className="title">Flash Study</div>
        </div>
        <div className="logout-button" onClick={handleLogout}>
          Logout
        </div>
        <SideBar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} user={user}/>
      </div>
    </div>
  );
};

export default TopBar;