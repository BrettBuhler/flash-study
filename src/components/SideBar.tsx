import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SideBar.css';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/dashboard';
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      {/* Side Bar Content */}
      <ul className="sidebar-ul">
        {!isDashboardRoute && (
          <li className="sidebar-ul-li">
            <button onClick={() => navigate('/dashboard')} className="sidebar-ul-li-button">
              Dashboard
            </button>
          </li>
        )}
        <li className="sidebar-ul-li">
          <button onClick={() => navigate('/add-deck')} className="sidebar-ul-li-button">
            Add Deck
          </button>
        </li>
        <li className="sidebar-ul-li">
          <button onClick={() => navigate('/edit-decks')} className="sidebar-ul-li-button">
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