// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import CustomBarChart from './BarChart';

function StudentDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/student/barChartData')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
      <CustomBarChart data={data} />
    </div>
  );
}

export default StudentDashboard;
