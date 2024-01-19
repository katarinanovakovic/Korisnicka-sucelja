import Button from '@/components/button/page';
import React, { useState } from 'react';

interface DropdownProps {
  showDropdown: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const categories = ["breakfast", "lunch", "dinner", "dessert", "snack", "all"];

const Dropdown: React.FC<DropdownProps> = ({ showDropdown, onMouseOver, onMouseOut }) => {
  const [clickedButton, setClickedButton] = useState<string>('');
  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%', // Increased margin-top
    left: 0,
    width: '150px',
    backgroundColor: '#FFFFFF',
    borderRadius: '20px', // Increased border-radius for a rounder appearance
    padding: '8px',
    display: showDropdown ? 'block' : 'none',
    zIndex: '1000',
  };

  const listStyle: React.CSSProperties = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={dropdownStyle} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <ul style={listStyle}>
        {categories.map((name) => (
          <li key={name}>
            {name === "all" ? (
              <Button path={`/recipes`} name={name} setClickedButton={setClickedButton}/>
            ) : (
              <Button path={`/recipes/${name}`} name={name} setClickedButton={setClickedButton}/>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
