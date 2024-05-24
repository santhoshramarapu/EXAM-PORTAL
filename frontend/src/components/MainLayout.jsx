import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Accordion from './Accordion'; // Adjust the import path as necessary
import '../../src/styles/MainLayout.css'; // Import the CSS file
import HomePage from './Homepage';

const MainLayout = () => {
  const accordionItems = [
    { title: 'Students', link: '/students' },
    { title: 'Results', link: '/results' },
    { title: 'Graphs', link: '/graphs' },
    { title: 'Attendance', link: '/attendance' },
    { title: 'Settings', link: '/settings' }
  ];

  return (
    <div className="main-layout">
      <div className="accordion-container">
        <Accordion items={accordionItems} />
      </div>
      <div className="content-container">
        <Outlet /> {/* This will render the nested routes' content */}
        <HomePage/>
      </div>
    </div>
  );
};

export default MainLayout;
