import React, { useState } from 'react';
import axios from 'axios';
import '../../src/styles/StudentForm.css'; // Import the CSS file with the styles

const StudentForm = () => {
  // conat [atuDATa, SETsTUdATA] = useState({
  //   stdname : "",
    
  // })
  const [stdname, setstdname] = useState('');
  const [HallticketNo, setHallticketNo] = useState('');
  const [english, setEnglish] = useState(0);
  const [java, setJava] = useState(0);
  const [python, setPython] = useState(0);
  const [cpp, setCpp] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/studentform', {
        stdname,
        HallticketNo,
        marks: {
          english: english,
          java: java,
          python: python,
          cpp: cpp
        }
      });
      console.log(response.data); // Assuming backend returns some response
      // Optionally, you can reset the form fields after successful submission
      setstdname('');
      setHallticketNo('');
      setEnglish(0);
      setJava(0);
      setPython(0);
      setCpp(0);
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
            value={studame}
            onChange={(e) => setstdname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rollNo">HallticketNO:</label>
          <input
            type="text"
            id="rollNo"
            value={HallticketNo}
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
