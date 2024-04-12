import React, { useState } from 'react';
import Link from 'next/link';
import Dropdown from '../dropdown/page';

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

    setIsDropdownVisible(false);
  };

  const handleDropdownClick = () => {
    setClickedButton("Recipes");
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isActive ? '#FFFFFF' : isHovered ? 'rgb(var(--main-color-rgb))' : '#FFFFFF',
    color: isActive ? 'rgb(var(--main-color-rgb))' : isHovered ? '#FFFFFF' : '#000000',
    border: isActive ? '2px solid rgb(var(--main-color-rgb))' : 'none',
    opacity: disabled ? '0.4' : '1',
    width: '100px',
    height: '40px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease, border 0.3s ease'
  };

  return (
    <div>
      <div className="relative">
        <Link href={path}>
          <button
            onClick={handleClick}
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            disabled={disabled}>
            {name}
          </button>
        </Link>
        {(isHovered || isDropdownVisible) && name === 'Recipes' && (
          <Dropdown
            showDropdown={isDropdownVisible}
            onMouseOver={handleDropdownMouseOver}
            onMouseOut={handleDropdownMouseOut}
            notifyParent={handleDropdownClick} 
          />
        )}
      </div>
    </div>
  );
};

export default Button;
