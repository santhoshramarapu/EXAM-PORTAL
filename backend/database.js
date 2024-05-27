const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'data'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

app.post('/studentform', (req, res) => {
    const { stdname, hallticketNo, englishMarks, javaMarks, pythonMarks, cppMarks } = req.body;

    // Calculate total marks
    const marks = englishMarks + javaMarks + pythonMarks + cppMarks;
    // Determine result
    const result = marks > 150 ? 'Pass' : 'Fail';

    // Insert student data into 'students' table
    let sqlStudent = 'INSERT INTO students (hallticketNo, stdname, marks, result) VALUES (?, ?, ?, ?)';
    connection.query(sqlStudent, [hallticketNo, stdname, marks, result], (err, result) => {
        if (err) {
            console.error('Error inserting into students:', err);
            return res.status(500).send('Error inserting into students');
        }

        // Insert subject data into 'subjects' table
        let sqlSubject = 'INSERT INTO subjects (hallticketNo, english, java, python, cpp) VALUES (?, ?, ?, ?, ?)';
        connection.query(sqlSubject, [hallticketNo, englishMarks, javaMarks, pythonMarks, cppMarks], (err, result) => {
            if (err) {
                console.error('Error inserting into subjects:', err);
                return res.status(500).send('Error inserting into subjects');
            }

            res.status(200).send('Student data inserted successfully');
        });
    });
});


app.listen(3000, () => console.log('Server starting at port 3000'));
