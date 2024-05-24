const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Import bodyParser for parsing JSON request bodies

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

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Define route for handling POST request to '/studentform'
app.post('/studentform', (req, res) => {
    const { studentName, HallticketNo, marks: { english, java, python, cpp } } = req.body;
    let sql = 'SELECT * FROM students WHERE hallticketNo = ?';
    connection.query(sql, [HallticketNo], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            return res.status(400).send('Hallticket number already exists');
        }

        sql = 'INSERT INTO students (stdname, hallticketNo) VALUES (?, ?)';
        connection.query(sql, [studentName, HallticketNo], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            const newRollno = HallticketNo;
            sql = 'INSERT INTO subjects (hallticketNo, java, cpp, python, english) VALUES (?, ?, ?, ?, ?)';
            connection.query(sql, [newRollno, java, cpp, python, english], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send('Form submitted successfully');
            });
        });
    });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
