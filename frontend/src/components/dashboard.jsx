// src/App.js
import React from 'react';
import { BrowserRouter as  Routes,  Route } from 'react-router-dom';
import SubjectDashboard from './SubjectDashboard';
import StudentDashboard from './Subject1Dashboard';
import MainLayout from './MainLayout';
import '../../src/styles/dashboard.css';

function Graph() {
  return (
    <MainLayout>
    <Routes>
     
          <Route path="/students" element={ <StudentDashboard/> } />
          <Route path="/subjects" element={ <SubjectDashboard/> } />
          
            <h1>Welcome to the Student Dashboard</h1>
          
    </Routes>
    </MainLayout>
  );
}

export default Graph;
