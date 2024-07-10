'use client'
import React, { useState } from 'react';
import Button from "@/components/button/page";

const pages = {
  Home: "/",
  Recipes: "/recipes/all",
  About: "/about",
  MyProfile: "/myProfile",
};

const NavBar = () => {
  const [clickedButton, setClickedButton] = useState<string>('');

  return (
    <div className="flex items-center justify-center">
      <nav className="mt-8 rounded-full shadow-lg z-50 bg-custom-main-color md:bg-white ml-4">
        <div>
          <ul className="flex md:p-2 justify-around">
            {Object.entries(pages).map(([name, path]) => (
              <li className = "mx-4 my-1" key={name}>
                <Button path={path} name={name} isActive={clickedButton === name} setClickedButton={setClickedButton}>{name}</Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
