import React, { useState } from 'react';
import '../styles/TopBar.css';
import SideBar from './SideBar';

interface TopBarProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}

const TopBar: React.FC<TopBarProps> = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    setUser({});
  };

  return (
    <div className="topbar-container">
      <div className="hamburger-menu" onClick={handleMenuClick}>
        <div className={`line ${isMenuOpen ? 'line-open' : ''}`}></div>
        <div className={`line ${isMenuOpen ? 'line-open' : ''}`}></div>
        <div className={`line ${isMenuOpen ? 'line-open' : ''}`}></div>
      </div>
      <div className="title">Flash Study</div>
      <div className="logout-button" onClick={handleLogout}>
        Logout
      </div>
      <SideBar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}/>
    </div>
  );
};

export default TopBar;