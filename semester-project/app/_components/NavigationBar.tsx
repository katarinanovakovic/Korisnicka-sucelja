// NavBar.tsx
'use client'

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button'; 

interface NavBarProps {
  // You can add any additional props if needed
}

const NavigationBar: React.FC<NavBarProps> = () => {
  const handleButtonClick = () => {
    //alert('Button clicked on HomePage!');
  };
  return (
    <nav style={{ backgroundColor: '#d9ffd9', padding: '10px' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/">
            <Button onClick={handleButtonClick}>Home</Button>
          </Link>
        </li>
        <li>
          <Link to="/recipes">
            <Button onClick={handleButtonClick}>Recipes</Button>
          </Link>
        </li>
        <li>
          <Link to="/diet">
            <Button onClick={handleButtonClick}>Diet</Button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <Button onClick={handleButtonClick}>About</Button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <Button onClick={handleButtonClick}>Log In</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
