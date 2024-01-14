'use client'
import React, { useState, useRef } from "react";
import Button from "@/components/Button";

const categories = ["breakfast", "lunch", "dinner", "dessert", "snack", "all"];

const styles = {
  dropdownContainer: {
    position: "relative",
    zIndex: 1,
  } as const,
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 2, 
  } as const,
};

const Dropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={styles.dropdownContainer}>
      <Button path={`/recipes`} name="Recipes" onClick={handleClick} />
      {isDropdownVisible && (
        <ul  style={styles.dropdownList}>
          {categories.map((name) => (
            <li key={name} onClick={handleClick}>
              {name === "all" ? (
                <Button path={`/recipes`} name={name} onClick={handleClick} />
              ) : (
                <Button path={`/recipes/${name}`} name={name} onClick={handleClick} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
