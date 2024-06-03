import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Accordion from './Accordion'; // Adjust the import path as necessary
import '../../src/styles/MainLayout.css'; // Import the CSS file


const MainLayout = ({children}) => {
  const accordionItems = [
    { title: 'Exam', link: '/dashboard' },
    { title: 'StudentsForm', link: '/StudentsForm' },
    { title: 'Results', link: '/Results' },
    { title: 'Graph', link: '/Graph' }
  ];

  return (
    <div className="main-layout">
      <div className="accordion-container">
        <Accordion items={accordionItems} />
      </div>
      <div className="content-container">
        <Outlet /> {/* This will render the nested routes' content */}
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
