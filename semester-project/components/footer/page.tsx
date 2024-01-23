'use client'
import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h1>HEALTHY
          <br/>
          AND
          <br/>
          EASY
        </h1>
      </div>
      <div className="footer-section">
        <h2>Our Services</h2>
        <ul className="our-services-list">
          <li className="our-service-item"><a href="/" className="our-service-link">Home</a></li>
          <li className="our-service-item"><a href="/recipes" className="our-service-link">Recipes</a></li>
          <li className="our-service-item"><a href="/about" className="our-service-link">About</a></li>
          <li className="our-service-item"><a href="/myprofile" className="our-service-link">My Profile</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <div className='social-media-conatiner'>
        <h2>Social Media</h2>
        <div className="social-media">
          <div className="social-media-row">
            <img src='https://i.pinimg.com/236x/f4/1e/2d/f41e2dab621c1ee5253cef74e3642fcf.jpg' alt='Instagram'></img>          
            <p>@healthyandeasy</p>
          </div>
          <div className='social-media-row'>
            <img src='https://i.pinimg.com/236x/b5/9d/15/b59d15f1d09ebd9882cad4a448688aac.jpg' alt='Facebook'></img>
            <p>Healthy And Easy</p>
          </div>
          <div className='social-media-row'>
            <img src='https://i.pinimg.com/564x/00/b5/c7/00b5c767f9d7903675033506787fc952.jpg' alt='TikTok'></img>
            <p>HealtyAndEasy</p>
          </div>
        </div>
        </div>
      </div>
      <div className="footer-section">
        <h2>Contact</h2>
        <p>email: healthyandeasy@gmali.com</p>
        <p>tel: +385 779 2456</p>
      </div>
    </footer>
  );
};

export default Footer;