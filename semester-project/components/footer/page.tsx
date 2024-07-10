'use client'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-custom-main-color text-white p-5 flex justify-around items-start flex-wrap rounded">
      <div className="w-full md:w-1/4 mb-4 text-center"> 
        <h1 className='text-4xl font-bold mt-5 font-arial-rounded'>HEALTHY
          <br/>
          AND
          <br/>
          EASY
        </h1>
      </div>
      <div className="w-full md:w-1/4 mb-4 text-center">
        <h2 className="text-1.2rem mb-4 underline font-bold">Our Services</h2>
        <ul className="list-none p-0 m-0">
          <li className="mb-2 text-center"><a href="/" className="hover:text-[#163b16] hover:font-bold">Home</a></li>
          <li className="mb-2 text-center"><a href="/recipes" className="hover:text-[#163b16] hover:font-bold">Recipes</a></li>
          <li className="mb-2 text-center"><a href="/about" className="hover:text-[#163b16] hover:font-bold">About</a></li>
          <li className="mb-2 text-center"><a href="/myprofile" className="hover:text-[#163b16] hover:font-bold">My Profile</a></li>
        </ul>
      </div>
      <div className="w-full md:w-1/4 mb-4 text-center">
        <h2 className="text-1.2rem mb-4 underline font-bold">Social Media</h2>
        <div className="mb-4">
          <div className="flex justify-center mb-4">
            <div><FontAwesomeIcon icon={faInstagram} /></div>
            <p className="ml-2">healthyandeasy</p>
          </div>
          <div className="flex justify-center mb-4">
            <div><FontAwesomeIcon icon={faFacebook} /></div>
            <p className="ml-2">Healthy And Easy</p>
          </div>
          <div className="flex justify-center mb-4">
            <div><FontAwesomeIcon icon={faTiktok} /></div>
            <p className="ml-2">HealtyAndEasy</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 mb-4 text-center">
        <h2 className="text-1.2rem mb-4 underline font-bold">Contact</h2>
        <p className="mb-4">email: healthyandeasy@gmail.com</p>
        <p className="mb-4">tel: +385 779 2456</p>
      </div>
    </footer>
  );
};

export default Footer;
