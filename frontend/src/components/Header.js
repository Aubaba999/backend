import React, { useState } from 'react';
import './Header.css';

function Header({ setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // ปิดเมนูหลังคลิก
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => handleNavClick('home')}>
        <img src="/images/logo.png" alt="GENSKIN Logo" />
      </div>

      {/* Hamburger Menu Button */}
      <button 
        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation */}
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <button className="nav-link" onClick={() => handleNavClick('home')}>หน้าหลัก</button>
        <button className="nav-link" onClick={() => handleNavClick('about')}>เกี่ยวกับเรา</button>
        <button className="nav-link" onClick={() => handleNavClick('services')}>บริการ</button>
        <button className="nav-link" onClick={() => handleNavClick('contact')}>ติดต่อ</button>

        <button 
          className="start-btn"
          onClick={() => handleNavClick('login')}
        >
          เริ่มต้นใช้งาน
        </button>
      </nav>

      {/* Overlay */}
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  );
}

export default Header;