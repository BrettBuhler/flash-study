import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SideBar.css';

interface SideBarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: any
  handleLogout: () => void
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen, user, handleLogout}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/dashboard';
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navHelper = (route: string) => {
    if (Object.keys(user).length > 0){
      navigate(route)
    } else {
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    const handleMouseDownOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleMouseDownOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`} ref={sidebarRef}>
      <div className='menu-div'>Menu</div>
      <ul className="sidebar-ul">
        {!isDashboardRoute && (
          <li className="sidebar-ul-li">
            <button onClick={() => navHelper('/dashboard')} className="add-deck-button">
              Dashboard
            </button>
          </li>
        )}
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/study')} className="add-deck-button">
            Study
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/store')} className="add-deck-button">
            Store
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/add-deck')} className="add-deck-button">
            Add Deck
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/edit-decks')} className="add-deck-button">
            Edit Decks
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/stats')} className="add-deck-button">
            Stats
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/help')} className="add-deck-button">
            Help
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => setIsOpen(false)} className="add-deck-button">
            Close
          </button>
        </li>
      </ul>
      <div className='sidebar-bottom-div'></div>
      <div className='side-bar-logout-button-container'>
        <button className='add-deck-button' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;