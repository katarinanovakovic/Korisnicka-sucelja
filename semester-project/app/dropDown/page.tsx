'use client'
import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";


const categories = ["breakfast", "lunch", "dinner", "dessert", "snack", "all"]; 

const Dropdown = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);


    const handleClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    return (
        <div ref = {dropdownRef}>
            <button onClick={handleClick}>Recipes</button>
                {isDropdownVisible && 
                    (<ul>
                        {categories.map((name) => 
                        (<li key = {name} onClick={handleClick}>
                            {(name === "all") ? (<Link href={`/recipes`}>{name}</Link>) : (<Link href={`/recipes/${name}`}>{name}</Link>)}
                        </li>))}
                    </ul>)}
        </div>
    );
};

export default Dropdown;