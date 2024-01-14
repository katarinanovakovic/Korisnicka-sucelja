'use client'
import React, { useState } from 'react';
import Link from 'next/link';

interface ButtonProps {
  path: string;
  name: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ path, name, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isHovered ? '#006400' : '#90EE90',
    color: isHovered ? '#FFFFFF' : '#000000',
    padding: '10px 15px',
    width: '100px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <Link href={path}>
      <button
        onClick={onClick}
        style={buttonStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {name}
      </button>
    </Link>
  );
};

export default Button;
