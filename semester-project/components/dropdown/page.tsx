import Button from '@/components/button/page';
import React, { useState } from 'react';

interface DropdownProps {
  showDropdown: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  notifyParent: () => void;
}

const categories = ["breakfast", "lunch", "dinner", "dessert", "snack", "all"];

const Dropdown: React.FC<DropdownProps> = ({ showDropdown, onMouseOver, onMouseOut, notifyParent }) => {
  const [clickedButton, setClickedButton] = useState<string>('');

  return (
    <div className="absolute" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <ul className="bg-white rounded-[40px] p-3 flex flex-col items-center m-0">
        {categories.map((name) => (
          <li className = "m-2" key={name}>
            {name === "all" ? (
              <Button path={`/recipes`} name={name} onClick={notifyParent} setClickedButton={setClickedButton}/>
            ) : (
              <Button path={`/recipes/${name}`} name={name} onClick={notifyParent} setClickedButton={setClickedButton}/>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
