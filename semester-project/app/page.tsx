'use client'
import Button from '@/components/Button';
import React from 'react';
import './home.css';

const Home: React.FC = () => {
  return (
    <div>
      <div className="app-container">
      <div className="left-half">
        <div className="title">
        HEALTY 
        <br/>
        AND
        <br/>
        EASY
        </div>
        <div className="description">Wholesome Recipes Made Simple: 
        <br/>
        Discover a World of Healthy Culinary Delights!.</div>
        <br/>
        <Button path="/recipes" name="GO ->"></Button>
      </div>
      <div className="right-half">
        <img className="image" src="https://i.pinimg.com/564x/dd/78/d2/dd78d2be7258b95a61c32aa6fb8e56ce.jpg" alt="Slika" />
      </div>
    </div>
    </div>
  );
};

export default Home;
