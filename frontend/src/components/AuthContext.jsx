import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn from localStorage or default to false if not found
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store isLoggedIn in localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Update isLoggedIn in localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
