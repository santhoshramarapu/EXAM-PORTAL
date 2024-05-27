// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const studentRoutes = require('./studentRoutes');


// Auth Server
const authApp = express();
authApp.use(express.json());
authApp.use(cors());
authApp.use('/auth', authRoutes);

const AUTH_PORT = 3000;
authApp.listen(AUTH_PORT, () => {
    console.log(`Auth server is running on http://localhost:${AUTH_PORT}`);
});

// Student Server
const studentApp = express();
studentApp.use(express.json());
studentApp.use(cors());
studentApp.use('/student', studentRoutes);

const STUDENT_PORT = 3001;
studentApp.listen(STUDENT_PORT, () => {
    console.log(`Student server is running on http://localhost:${STUDENT_PORT}`);
});
