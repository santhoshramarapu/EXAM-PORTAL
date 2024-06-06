import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/styles/StudentDropdown.css'; // Import the CSS file

const StudentDropdown = ({ onSelectStudent }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    // Fetch student data from your API
    axios.post('http://localhost:3001/student/students')
      .then(response => {
        setStudents(response.data); // Assuming your API returns an array of student objects
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const handleChange = (event) => {
    const selectedName = event.target.value;
    setSelectedStudent(selectedName);
    onSelectStudent(selectedName);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="student">Select a student:</label>
      <select id="student" value={selectedStudent} onChange={handleChange}>
        <option value="">Select a student</option>
        {students.map((student, idx) => (
          <option key={idx} value={student.stdname}>{student.stdname}</option>
        ))}
      </select>
    </div>
  );
};

export default StudentDropdown;
