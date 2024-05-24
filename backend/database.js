const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

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

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());



app.post('/register', async (req, res) => {
    const { email, password, google_id, firstName, lastName } = req.body;

    // Check if the request includes a google_id
    if (google_id) {
        // Google registration
        const userExistsQuery = 'SELECT * FROM users WHERE google_id = ?';
        connection.query(userExistsQuery, [google_id], (err, results) => {
            if (err) {
                console.error('Error executing SQL query: ' + err.stack);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length > 0) {
                // User already exists
                // You can generate a JWT token here and return it
                // Example: const token = jwt.sign({ id: results[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
                // return res.status(200).json({ token });
            } else {
                // New Google user
                const insertQuery = 'INSERT INTO users (email, password, google_id, firstname, lastname) VALUES (?, ?, ?, ?, ?)';
                connection.query(insertQuery, [email, null, google_id, firstName, lastName], (err, result) => {
                    if (err) {
                        console.error('Error executing SQL query: ' + err.stack);
                        return res.status(500).send('Internal Server Error');
                    }

                    // User registered successfully
                    // You can generate a JWT token here and return it
                    // Example: const token = jwt.sign({ id: result.insertId }, 'your_jwt_secret', { expiresIn: '1h' });
                    // return res.status(201).json({ token });
                });
            }
        });
    } else {
        // Normal registration
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the email already exists in the database
        const emailCheckQuery = 'SELECT COUNT(*) AS email_count FROM users WHERE email = ?';
        connection.query(emailCheckQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error executing SQL query: ' + err.stack);
                return res.status(500).send('Internal Server Error');
            }

            if (results[0].email_count > 0) {
                // If the email already exists, return an error response
                return res.status(400).send('Email already exists');
            }

            // If the email doesn't exist, proceed with registration
            const registerQuery = 'INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)';
            connection.query(registerQuery, [email, hashedPassword, firstName, lastName], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query: ' + err.stack);
                    return res.status(500).send('Internal Server Error');
                }

                // User registered successfully
                // You can generate a JWT token here and return it
                // Example: const token = jwt.sign({ id: result.insertId }, 'your_jwt_secret', { expiresIn: '1h' });
                // return res.status(201).json({ token });
            });
        });
    }
});




app.post('/signin', (req, res) => {
    const { email, password, google_id } = req.body;

    if (google_id) {
        // Google sign-in
        const userQuery = 'SELECT * FROM users WHERE google_id = ?';
        connection.query(userQuery, [google_id], async (err, results) => {
            if (err) {
                console.error('Error executing SQL query: ' + err.stack);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                return res.status(404).send('User not found');
            }

            // Google sign-in successful
            res.status(200).send('Google Signin successful');
        });
    } else {
        // Normal sign-in
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

            // Normal sign-in successful
            res.status(200).send('Normal Signin successful');
        });
    }
});


// GET endpoint to retrieve all users (for demonstration purposes)
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL query: ' + err.stack);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
