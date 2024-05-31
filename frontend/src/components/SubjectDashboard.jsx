// src/components/SubjectDashboard.js
import React, { useState, useEffect } from 'react';
import CustomPieChart from './PieChart';

function SubjectDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/student/pieChartData')
      .then(response => response.json())
      .then(data => setData(data.map(subject => ({
        stdname: subject.stdname,
        english: subject.english,
        java: subject.java,
        python: subject.python,
        cpp: subject.cpp,
        total: subject.english + subject.java + subject.python + subject.cpp
      }))))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Subject Dashboard</h1>
      <CustomPieChart data={data} />
    </div>
  );
}

export default SubjectDashboard;
