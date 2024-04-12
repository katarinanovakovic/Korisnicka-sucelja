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
    <div className="relative flex items-center justify-center">
      <nav className="mt-8 rounded-full shadow-lg z-50 bg-white">
        <div>
          <ul className="flex p-2 justify-around">
            {Object.entries(pages).map(([name, path]) => (
              <li className = "mx-4 my-1" key={name}>
                <Button path={path} name={name} isActive={clickedButton === name} setClickedButton={setClickedButton}></Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
