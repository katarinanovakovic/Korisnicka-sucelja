// AuthToggle.tsx
import React from 'react';

interface AuthToggleProps {
  showSignUp: boolean;
  toggleSignUp: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ showSignUp, toggleSignUp }) => {
  return (
    <button onClick={toggleSignUp}>
      {showSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
    </button>
  );
};

export default AuthToggle;
