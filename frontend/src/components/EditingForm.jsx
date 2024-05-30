import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../src/styles/EditingForm.css';
import MainLayout from './MainLayout';
import { GoBackButton } from './Logout';

const EditingComponent = ({ studentData }) => {
  const [stdname, setStdname] = useState(studentData?.stdname || '');
  const [hallticketNo, setHallticketNo] = useState(studentData?.hallticketNo || '');
  const [englishMarks, setEnglishMarks] = useState(studentData?.englishMarks || '');
  const [javaMarks, setJavaMarks] = useState(studentData?.javaMarks || '');
  const [pythonMarks, setPythonMarks] = useState(studentData?.pythonMarks || '');
  const [cppMarks, setCppMarks] = useState(studentData?.cppMarks || '');
  const [isEditing, setIsEditing] = useState(true);
  const [editMessage, setEditMessage] = useState('');

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/student/edit/${hallticketNo}`, {
        stdname,
        hallticketNo,
        english: Number(englishMarks),
        java: Number(javaMarks),
        python: Number(pythonMarks),
        cpp: Number(cppMarks)
      });
      console.log('Edit successful:');
      
      // Set the success message and reset the form fields
      setEditMessage('Edit successful');
      setStdname('');
      setHallticketNo('');
      setEnglishMarks('');
      setJavaMarks('');
      setPythonMarks('');
      setCppMarks('');
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 error for invalid marks
        console.error('Invalid marks error:', error.response.data.message);
        // Display an error message to the user
        setEditMessage('Invalid marks');
      } else {
        console.error('Error editing form:', error);
        // Handle other errors
      }
    }
  };

  const buttonPosition = {
    top: '627px',
    left: '970px',
};

  const handleCancel = () => {
    // Reset all the fields to initial values or empty
    setStdname('');
    setHallticketNo('');
    setEnglishMarks('');
    setJavaMarks('');
    setPythonMarks('');
    setCppMarks('');
    setIsEditing(false); // Exit edit mode
  };

  return (
    <MainLayout>
      <div className="form-wrapper">
        <div className="form-container">
          <h2>Edit Student Form</h2>
          {editMessage && <p className="error-message">{editMessage}</p>}
          <form onSubmit={handleEditSubmit}>
            <div className="input-wrapper">
              <label htmlFor="stdname">Student Name:</label>
              <input
                type="text"
                id="stdname"
                value={stdname}
                onChange={(e) => setStdname(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="hallticketNo">Hall Ticket Number:</label>
              <input
                type="text"
                id="hallticketNo"
                value={hallticketNo}
                onChange={(e) => setHallticketNo(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="englishMarks">English Marks:</label>
              <input
                type="number"
                id="englishMarks"
                value={englishMarks}
                onChange={(e) => setEnglishMarks(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="javaMarks">Java Marks:</label>
              <input
                type="number"
                id="javaMarks"
                value={javaMarks}
                onChange={(e) => setJavaMarks(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="pythonMarks">Python Marks:</label>
              <input
                type="number"
                id="pythonMarks"
                value={pythonMarks}
                onChange={(e) => setPythonMarks(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="cppMarks">C++ Marks:</label>
              <input
                type="number"
                id="cppMarks"
                value={cppMarks}
                onChange={(e) => setCppMarks(e.target.value)}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
      <GoBackButton position={buttonPosition}/>
    </MainLayout>
  );
};

EditingComponent.propTypes = {
  studentData: PropTypes.shape({
    stdname: PropTypes.string.isRequired,
    hallticketNo: PropTypes.string.isRequired,
    englishMarks: PropTypes.number.isRequired,
    javaMarks: PropTypes.number.isRequired,
    pythonMarks: PropTypes.number.isRequired,
    cppMarks: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditingComponent;
