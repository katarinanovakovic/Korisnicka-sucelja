'use client'
import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import "@/components/singUpForm/page";
import SignUpForm from '@/components/singUpForm/page';
import LogInForm from '@/components/logInForm/page';

const LoginPage: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Retrieve the login status from localStorage on component mount
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // Save the login status to localStorage whenever it changes
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = (status: string) => {
    if (status === 'User is logged in') {
      setLoggedIn(true);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>haha</div>
      ) : (
        <LogInForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default LoginPage;
