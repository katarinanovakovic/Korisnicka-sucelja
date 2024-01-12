// HomePage.tsx
'use client'


import Button from '@/components/Button';
import React from 'react';
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';



const HomePage: React.FC = () => {
  const handleButtonClick = () => {
    alert('Button clicked on HomePage!');
  };

  return (
    <div>
      <h1 className="font-playfair text-5xl text-center lg:text-left xl:text-6xl font-extrabold text-brand-purple-900 whitespace-break-spaces">
        HEALTHY <br/>
        AND <br />
        EASY <br />
        <br/>
      </h1>
      <p className="font-roboto text-base text-center text-brand-purple-900 lg:text-left xl:text-lg whitespace-break-spaces">
        Wholesome Recipes Made Simple: 
        <br/>
        Discover a World of Healthy Culinary Delights!
      </p>
      <br/>
      <br/>
      <Button onClick={handleButtonClick}>LET'S GO</Button>
    </div>
  );
};

export default HomePage;
