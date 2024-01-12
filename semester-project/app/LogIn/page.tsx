// LoginPage.tsx

import React from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-heading">Log In</h1>
        <div className="input-container">
          <input type="text" placeholder="Username" className="username-input" />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Password" className="password-input" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
