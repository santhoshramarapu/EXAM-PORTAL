const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'data'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);

    // Query the students table
    connection.query('SELECT * FROM students', (error, results, fields) => {
        if (error) throw error;
        console.log('Students:', results);

        // Query the users table
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) throw error;
            console.log('Users:', results);

            connection.query('SELECT * FROM subjects', (error, results, fields) => {
                if (error) throw error;
                console.log('Subjects', results);
                // Close the connection
                connection.end();
            });
        });
    });
});
