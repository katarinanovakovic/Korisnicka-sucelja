'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from "@/components/button/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'; 
import './navBar.css';

const pages = {
  Home: "/",
  Recipes: "/recipes/all",
  About: "/about",
  MyProfile: "/myProfile",
};

const visiblePages = ["/", "/recipes/all", "/about", "/myProfile", "/recipes/breakfast", "/recipes/lunch",
  "/recipes/dinner", "/recipes/dessert", "/recipes/snack", "/recipes"
];

const NavBar = () => {
  const [clickedButton, setClickedButton] = useState<string>('');
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(true);
  const [isWiderThan680px, setIsWiderThan680px] = useState<boolean>(true);
  const pathname = usePathname();

  // Update visibility and icon based on screen size
  const handleResize = () => {
    setIsWiderThan680px(typeof window !== 'undefined' && window.innerWidth >= 680);
    setIsNavBarVisible(visiblePages.includes(pathname));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Set initial visibility based on provided pages
  useEffect(() => {
    setIsNavBarVisible(visiblePages.includes(pathname));
  }, [pathname]);

  // Set CSS variable based on visibility state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--page-margin', !isNavBarVisible ? '-50px' : '0');
    }
  }, [isNavBarVisible]);

  const handleToggleVisibility = () => {
    setIsNavBarVisible(!isNavBarVisible);
  };

  return (
    <div className="navbar-container">
      <nav style={{ display: isNavBarVisible ? 'block' : 'none' }}>
        <div>
          <ul className="navbar-list">
            {Object.entries(pages).map(([name, path]) => (
              <li key={name}>
                <Button path={path} name={name} isActive={clickedButton === name} setClickedButton={setClickedButton}></Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <button onClick={handleToggleVisibility} className="menu-button">
      <FontAwesomeIcon
          icon={isWiderThan680px ? faBars : isNavBarVisible ? faCaretUp : faCaretDown}
          className="icon"
          style={{ color: (pathname === '/' && isWiderThan680px) ? 'white' : 'green' }}
        />
      </button>
    </div>
  );
};

export default NavBar;
