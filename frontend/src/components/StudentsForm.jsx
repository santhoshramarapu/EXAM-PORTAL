import React, { useState } from 'react';
import axios from 'axios';
import '../../src/styles/StudentForm.css'; // Import the CSS file with the styles

const StudentForm = () => {
  const [stdname, setStdname] = useState('');
  const [hallticketNo, setHallticketNo] = useState('');
  const [englishMarks, setEnglishMarks] = useState(0);
  const [javaMarks, setJavaMarks] = useState(0);
  const [pythonMarks, setPythonMarks] = useState(0);
  const [cppMarks, setCppMarks] = useState(0);
  const [error, setError] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setError('');
    setSubmissionError('');

    // Validate input fields
    if (!stdname || !hallticketNo || englishMarks === '' || javaMarks === '' || pythonMarks === '' || cppMarks === '') {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/studentform', { // Update URL to match your backend port
        stdname,
        hallticketNo,
        marks: {
          english: englishMarks,
          java: javaMarks,
          python: pythonMarks,
          cpp: cppMarks
        }
      });
      console.log(response.data); // Assuming backend returns some response
      // Optionally, you can reset the form fields after successful submission
      setStdname('');
      setHallticketNo('');
      setEnglishMarks(0);
      setJavaMarks(0);
      setPythonMarks(0);
      setCppMarks(0);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === 'Hall ticket number already exists') {
        setSubmissionError('Hall ticket number already exists.');
      } else {
        setSubmissionError('Error submitting form. Please try again.');
      }
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {submissionError && <p className="error">{submissionError}</p>}
        <div>
          <label htmlFor="stdname">Student Name:</label>
          <input
            type="text"
            id="stdname"
            value={stdname}
            onChange={(e) => setStdname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="hallticketNo">Hall Ticket Number:</label>
          <input
            type="text"
            id="hallticketNo"
            value={hallticketNo}
            onChange={(e) => setHallticketNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="englishMarks">English Marks:</label>
          <input
            type="number"
            id="englishMarks"
            value={englishMarks}
            onChange={(e) => setEnglishMarks(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="javaMarks">Java Marks:</label>
          <input
            type="number"
            id="javaMarks"
            value={javaMarks}
            onChange={(e) => setJavaMarks(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="pythonMarks">Python Marks:</label>
          <input
            type="number"
            id="pythonMarks"
            value={pythonMarks}
            onChange={(e) => setPythonMarks(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="cppMarks">C++ Marks:</label>
          <input
            type="number"
            id="cppMarks"
            value={cppMarks}
            onChange={(e) => setCppMarks(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
