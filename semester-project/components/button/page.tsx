import React, { useState } from 'react';
import Link from 'next/link';
import Dropdown from '@/components/dropDown/page';

interface ButtonProps {
  path: string;
  name: string;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  setClickedButton: (name: string) => void;
}

const Button: React.FC<ButtonProps> = ({ path, name, onClick, disabled, isActive, setClickedButton }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
    const handleMouseOver = () => {
      setIsHovered(true);
      if (name === "Recipes") {
        setIsDropdownVisible(true);
      }
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
      // Reset the dropdown visibility when moving away from the button
      setIsDropdownVisible(false);
    };
  
    const handleDropdownMouseOver = () => {
      setIsDropdownVisible(true);
    };
  
    const handleDropdownMouseOut = () => {
      setIsDropdownVisible(false);
    };
  
    const handleClick = () => {
      setClickedButton(name);
  
      if (onClick) {
        onClick();
      }
  
      // Reset the dropdown visibility when clicking on a button
      setIsDropdownVisible(false);
    };
  
    const buttonStyle: React.CSSProperties = {
      backgroundColor: isActive ? '#FFFFFF' : isHovered ? '#006400' : '#FFFFFF',
      color: isActive ? '#006400' : isHovered ? '#FFFFFF' : '#000000',
      border: isActive ? '2px solid #006400' : 'none',
      opacity: disabled ? '0.4' : '1',
      padding: '10px 15px',
      width: '100px',
      height: '40px',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease, border 0.3s ease',
    };
  
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <Link href={path}>
            <button
              onClick={handleClick}
              style={buttonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              disabled={disabled}>
              {name}
            </button>
            {(isHovered || isDropdownVisible) && name === 'Recipes' ? (
              <Dropdown showDropdown={isDropdownVisible} onMouseOver={handleDropdownMouseOver} onMouseOut={handleDropdownMouseOut} />
            ) : (
              ''
            )}
          </Link>
        </div>
      </div>
    );
  };
  
  export default Button;
  