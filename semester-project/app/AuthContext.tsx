'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  username: string | null; 
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>; 
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  });
  
  const [username, setUsername] = useState<string | null>(() => {
    if (typeof localStorage !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      return storedUsername !== null ? storedUsername : null;
    }
    return null;
  });
  
  useEffect(() => {
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isLoggedIn', String(isLoggedIn));
      localStorage.setItem('username', username || ''); 
    }
  }, [isLoggedIn, username]);

  const value = { isLoggedIn, username, setLoggedIn, setUsername };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
