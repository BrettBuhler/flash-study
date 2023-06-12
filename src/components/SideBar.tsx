import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SideBar.css';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: any
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen, user}) => {
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
      <ul className="sidebar-ul">
        {!isDashboardRoute && (
          <li className="sidebar-ul-li">
            <button onClick={() => navHelper('/dashboard')} className="sidebar-ul-li-button">
              Dashboard
            </button>
          </li>
        )}
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/add-deck')} className="sidebar-ul-li-button">
            Add Deck
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => navHelper('/edit-decks')} className="sidebar-ul-li-button">
            Edit Decks
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => setIsOpen(false)} className="sidebar-ul-li-button">
            Close
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;