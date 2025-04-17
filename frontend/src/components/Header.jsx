// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
// import '../assets/scss/styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon} from '@fortawesome/free-regular-svg-icons';
import { faBars,faXmark,faLeaf } from '@fortawesome/free-solid-svg-icons';
import {removeToken}  from '../utils/auth';
import { useNavigate } from 'react-router-dom'; 





function Header() {

  const navigate = useNavigate(); // ⬅️ Inside the component

  const handleLogout = () => {
    removeToken();
    navigate('/login'); // ⬅️ Redirect to login
  };

  const [showMenu, setShowMenu] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);

  // Toggle scroll header
  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY >= 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <header className={`header ${scrollActive ? 'scroll-header' : ''}`} id="header">
      <nav className="nav container">
        <a href="/home" className="nav__logo">
        <FontAwesomeIcon icon={faLeaf} size="lg" color="#365949" /> Plantinum
        </a>

        <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            {['home', 'all-predictions', 'feedback', ].map((section) => (
              <li className="nav__item"  key={section}>
                <a
                  href={`/${section}`}
                  className="nav__link"
                  onClick={handleLinkClick}
                >
                  {section === 'contact' ? 'Contact Us' : section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
              
            ))}
            <li><button className='button' onClick={handleLogout}>Log out</button></li>
          </ul>
           
          <div className="nav__close" id="nav-close" onClick={() => setShowMenu(false)}>
          <FontAwesomeIcon icon={faXmark} size="lg" color="#555" />
          </div>
        </div>

        <div className="nav__btns">

          {/* <i className="ri-moon-line change-theme" id="theme-button"></i> */}

          <div className="nav__toggle" id="nav-toggle" onClick={() => setShowMenu(true)}>
          <FontAwesomeIcon icon={faBars} size="lg" color="#555"/>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
