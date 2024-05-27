// authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('./database');

// Registration endpoint
router.post('/register', async (req, res) => {
    const { email, password, google_id, firstName, lastName } = req.body;

    if (google_id) {
        // Google registration logic
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailCheckQuery = 'SELECT COUNT(*) AS email_count FROM users WHERE email = ?';

        connection.query(emailCheckQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error executing SQL query: ' + err.stack);
                return res.status(500).send('Internal Server Error');
            }

            if (results[0].email_count > 0) {
                return res.status(400).send('Email already exists');
            }

            const registerQuery = 'INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)';
            connection.query(registerQuery, [email, hashedPassword, firstName, lastName], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query: ' + err.stack);
                    return res.status(500).send('Internal Server Error');
                }
                return res.status(201).send('User registered successfully');
            });
        });
    }
});

// Sign-in endpoint
router.post('/signin', async (req, res) => {
    const { email, password, google_id } = req.body;

    if (google_id) {
        // Google sign-in logic
    } else {
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], async (err, results) => {
            if (err) {
                console.error('Error executing SQL query: ' + err.stack);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                return res.status(404).send('User not found');
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send('Incorrect password');
            }

            return res.status(200).send('Sign-in successful');
        });
    }
});

// Endpoint to retrieve all users
router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL query: ' + err.stack);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json(results);
    });
});

module.exports = router;
