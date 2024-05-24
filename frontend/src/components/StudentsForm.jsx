import React, { useState } from 'react';
import axios from 'axios';
import '../../src/styles/StudentForm.css'; // Import the CSS file with the styles

const StudentForm = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [englishMarks, setEnglishMarks] = useState(0);
  const [javaMarks, setJavaMarks] = useState(0);
  const [pythonMarks, setPythonMarks] = useState(0);
  const [cppMarks, setCppMarks] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/studentform', {
        studentName,
        rollNo,
        marks: {
          english: englishMarks,
          java: javaMarks,
          python: pythonMarks,
          cpp: cppMarks
        }
      });
      console.log(response.data); // Assuming backend returns some response
      // Optionally, you can reset the form fields after successful submission
      setStudentName('');
      setRollNo('');
      setEnglishMarks(0);
      setJavaMarks(0);
      setPythonMarks(0);
      setCppMarks(0);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container"> {/* Container div with the specified CSS class */}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rollNo">Roll Number:</label>
          <input
            type="text"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
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
