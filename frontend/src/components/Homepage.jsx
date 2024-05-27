import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/Homepage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      
      <div className="buttons-container">
        <h1>Student Management System</h1>
        <Link to="/studentsform">
          <button>Add Student</button>
        </Link>
        <Link to="/ViewResults">
          <button>View Results</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
