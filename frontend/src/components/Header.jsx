import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../../src/styles/Header.css';


function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="header">
      <nav>
        <h2 className="logo">RESULTS</h2>
        <ul className="nav-links">
          {isLoggedIn ? (
            <li><Link to="/logout">Logout</Link></li>
          ) : (
            <li><Link to="/Login">Sign In</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
