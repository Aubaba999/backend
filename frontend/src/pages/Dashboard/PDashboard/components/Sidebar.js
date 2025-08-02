import React from "react";
import { FiHome, FiUser, FiCalendar, FiLogOut } from "react-icons/fi";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <aside className="pd-sidebar">
      <nav className="pd-sidebar-nav">
        <button 
          onClick={() => handleNavigation('dashboard')}
          className={`pd-nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          aria-label="Dashboard"
        >
          <FiHome />
        </button>
        <button 
          onClick={() => handleNavigation('profile')}
          className={`pd-nav-item ${currentPage === 'profile' ? 'active' : ''}`}
          aria-label="Profile"
        >
          <FiUser />
        </button>
        <button 
          onClick={() => handleNavigation('calendar')}
          className={`pd-nav-item ${currentPage === 'calendar' ? 'active' : ''}`}
          aria-label="Appointments"
        >
          <FiCalendar />
        </button>
      </nav>
      <div className="pd-sidebar-footer">
        <button 
          onClick={() => handleNavigation('logout')}
          className="pd-nav-item" 
          aria-label="Log Out"
        >
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;