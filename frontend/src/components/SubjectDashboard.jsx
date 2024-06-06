import React, { useState, useEffect } from 'react';
import CustomPieChart from './PieChart';
import MainLayout from './MainLayout';
import StudentDropdown from './StudentDropdown';

function SubjectDashboard() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

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

  const handleSelectStudent = (studentName) => {
    setSelectedStudent(studentName);
  };

  const selectedStudentData = data.find(subject => subject.stdname === selectedStudent);

  const dashboardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  return (
    <MainLayout>
      <div style={dashboardStyle}>
        <h1>Subjects</h1>
        {selectedStudentData ? (
          <CustomPieChart data={[
            { name: 'English', value: selectedStudentData.english },
            { name: 'Java', value: selectedStudentData.java },
            { name: 'Python', value: selectedStudentData.python },
            { name: 'C++', value: selectedStudentData.cpp }
          ]} />
        ) : (
          <div>Please select a student to view their marks.</div>
        )}
        <StudentDropdown onSelectStudent={handleSelectStudent} />
      </div>
    </MainLayout>
  );
}

export default SubjectDashboard;
