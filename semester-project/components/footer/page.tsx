'use client'
import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h1 className='font-arial-rounded'>HEALTHY
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
          <div><FontAwesomeIcon icon={faInstagram} /></div>
              <p>healthyandeasy</p>
          </div>
          <div className='social-media-row'>
          <div><FontAwesomeIcon icon={faFacebook} /></div>
                      <p>Healthy And Easy</p>
          </div>
          <div className='social-media-row'>
          <div><FontAwesomeIcon icon={faTiktok} /></div>
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