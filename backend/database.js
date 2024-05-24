const mysql = require('mysql');
const express=require('express');
const app=express();

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

module.exports = connection;

app.post('/studentform', (req, res) => {
    const { stdname, marks: { english, java, python, cpp } } = req.body;
    let sql = 'SELECT * FROM students WHERE hallticketNo = ?';
    db.query(sql, [hallticketNo], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            return res.status(400).send('Hall-tickect number already exists');
        }

        sql = 'INSERT INTO students (stdname, hallticketNo,  class) VALUES (?, ?, ?, ?)';
        db.query(sql, [stdname, hallticketNo,  Class], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            const newRollno = hallticketNo;
            sql = 'INSERT INTO subjects (hallticketno, java, cpp, python) VALUES (?, ?, ?, ?)';
            db.query(sql, [newRollno, java, cpp, python, english], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/studentsform');
            });
        });
    });
});
app.listen(3000,console.log('server starting at port 3000)'));