import React, { useState, useEffect } from 'react';
import CustomBarChart from './BarChart';
import MainLayout from './MainLayout';


function StudentDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/student/barChartData')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const dashboardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  return (
    <MainLayout>
      <div style={dashboardStyle}>
        <h1>Students</h1>
        <CustomBarChart data={data} />
       
      </div>
    </MainLayout>
  );
}

export default StudentDashboard;
