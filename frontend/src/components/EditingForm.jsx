import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../src/styles/EditingForm.css';
import MainLayout from './MainLayout';
import Modal from './Modal';

const EditingComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.studentData || {};

  const [stdname, setStdname] = useState(data.stdname || '');
  const [hallticketNo, setHallticketNo] = useState(data.hallticketNo || '');
  const [englishMarks, setEnglishMarks] = useState(data.english || '');
  const [javaMarks, setJavaMarks] = useState(data.java || '');
  const [pythonMarks, setPythonMarks] = useState(data.python || '');
  const [cppMarks, setCppMarks] = useState(data.cpp || '');
  const [editMessage, setEditMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/student/edit/${hallticketNo}`, {
        stdname,
        hallticketNo,
        english: Number(englishMarks),
        java: Number(javaMarks),
        python: Number(pythonMarks),
        cpp: Number(cppMarks),
      });
      console.log('Edit successful:', response.data);
      setEditMessage('Edit successful');
      setIsModalOpen(true);  // Show the modal
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Invalid marks error:', error.response.data.message);
        setEditMessage('Invalid marks');
        setIsModalOpen(true);  // Show the modal even for error
      } else {
        console.error('Error editing form:', error);
        setEditMessage('Error editing form');
        setIsModalOpen(true);  // Show the modal even for error
      }
    }
  };

  const buttonPosition = {
    top: '627px',
    left: '970px',
  };

  const handleCancel = () => {
    setStdname('');
    setHallticketNo('');
    setEnglishMarks('');
    setJavaMarks('');
    setPythonMarks('');
    setCppMarks('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (editMessage === 'Edit successful') {
      navigate(`/viewresults/${hallticketNo}`);
    }
  };

  return (
    <MainLayout>
      <div className="form-wrapper">
        <div className="form-container">
          <h2>Edit Student Form</h2>
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
      {isModalOpen && <Modal message={editMessage} onClose={handleCloseModal} />}
    </MainLayout>
  );
};

export default EditingComponent;
