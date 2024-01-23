import Button from '@/components/button/page';
import React, { useState } from 'react';
import "./dropdown.css";

interface DropdownProps {
  showDropdown: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const categories = ["breakfast", "lunch", "dinner", "dessert", "snack", "all"];

const Dropdown: React.FC<DropdownProps> = ({ showDropdown, onMouseOver, onMouseOut }) => {
  const [clickedButton, setClickedButton] = useState<string>('');

  return (
    <div className={`dropdown-container ${showDropdown ? 'active' : ''}`} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <ul className="list">
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
