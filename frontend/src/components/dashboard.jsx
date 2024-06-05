import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainLayout from './MainLayout';
import '../../src/styles/dashboard.css';

function Graph() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <h1>Graphs</h1>
        <nav>
          <ul>
            <li>
              <Link to="/students">View Students</Link>
            </li>
            <li>
              <Link to="/subjects">View Subjects</Link>
            </li>
          </ul>
        </nav>
      </div>
    </MainLayout>
  );
}

export default Graph;
