// studentRoutes.js

const express = require('express');
const router = express.Router();
const connection = require('./database');

// Getting the students names for the dropdown//
router.post('/students', (req, res) => {
    const naming = 'select stdname from students;';
    connection.query(naming, (err, results) => {
        if (err) {
            return res.status(500).send('Database error.');
        }
        res.json(results);
    });
});

//Api for the student form submission //
router.post('/studentform', (req, res) => {
    const { stdname, hallticketNo, english, java, python, cpp } = req.body;
    console.log(req.body);
    if (!stdname || !hallticketNo || isNaN(hallticketNo) || isNaN(english) || isNaN(java) || isNaN(python) || isNaN(cpp)) {
        return res.status(400).send('Invalid data format.');
    }
    
    if (english > 100 || java > 100 || python > 100 || cpp > 100) {
        return res.status(400).send('Marks should be less than 100.');
    }
   
    const checkHallticketQuery = 'SELECT hallticketNo FROM students WHERE hallticketNo = ?';
    connection.query(checkHallticketQuery, [hallticketNo], (err, results) => {
        if (err) {
            console.error('Error checking hallticketNo:', err);
            connection.rollback(() => {
                //   connection.release();
                res.status(500).send('Database error.');
            });
            return;
        }

        if (results.length > 0) {
            connection.rollback(() => {
                //connection.release();
                res.status(400).send('Hallticket number already exists. Please use a different hallticket number.');
            });
            return;
        }

    const insertStudentQuery = `
                INSERT INTO students (hallticketNo, stdname)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE stdname = VALUES(stdname);
            `;

    const insertSubjectsQuery = `
                INSERT INTO subjects (hallticketNo, english, java, python, cpp)
                VALUES (?, ?, ?, ?, ?);
            `;

    const updateStudentMarksQuery = `
    UPDATE students
    SET 
        totalmarks = (
            SELECT SUM(english + java + python + cpp)
            FROM subjects
            WHERE subjects.hallticketNo = students.hallticketNo
        ),
        result = (
            CASE
                WHEN (
                    SELECT SUM(english + java + python + cpp)
                    FROM subjects
                    WHERE subjects.hallticketNo = students.hallticketNo
                ) > 200 THEN 'Pass'
                ELSE 'Fail'
            END
        )
    WHERE hallticketNo = ?;
`;
const updateEmailsQuery = `
            UPDATE students
            SET email = CONCAT(stdname, '@gmail.com');
        `;

                connection.query(updateEmailsQuery, (err, result) => {
                    if (err) {
                        console.error('Error updating emails:', err);
                        res.status(500).send('Error updating email addresses.');
                        return;
                    }

                    res.send('Column added and emails updated successfully.');

    connection.query(insertStudentQuery, [hallticketNo, stdname], (err) => {
        if (err) {
            console.error('Error inserting into students:', err);
            connection.rollback(() => {
              
                res.status(500).send('Error inserting into students.');
            });
            return;
        }

        connection.query(insertSubjectsQuery, [hallticketNo, english, java, python, cpp], (err) => {
            if (err) {
                console.error('Error inserting into subjects:', err);
                connection.rollback(() => {
                   
                    res.status(500).send('Error inserting into subjects.');
                });
                return;
            }

            connection.query(updateStudentMarksQuery, [hallticketNo], (err) => {
                if (err) {
                    console.error('Error updating student marks:', err);
                    connection.rollback(() => {
                       
                        res.status(500).send('Error updating student marks.');
                    });
                    return;
                }

                connection.commit((err) => {
                    if (err) {
                        console.error('Error committing transaction:', err);
                        connection.rollback(() => {
                           
                            res.status(500).send('Error committing transaction.');
                        });
                        return;
                    }

                  
                    res.status(200).send('Student data inserted successfully');
                });
            });
        });
    });
});
});
});


//The below code is for the Resultspage//

router.get('/ResultsPage/:hallticketno', (req, res) => {
    const hallticketno = req.params.hallticketno;

    let sql = `
    SELECT
        s.hallticketNo,
        s.stdname,
        sc.english,
        sc.java,
        sc.python,
        sc.cpp,
        (sc.english + sc.java + sc.python + sc.cpp) AS totalMarks,
        s.result
    FROM
        students s
    JOIN
        subjects sc ON s.hallticketNo = sc.hallticketNo
    WHERE
        s.hallticketNo = ?;
    `;

    connection.query(sql, [hallticketno], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Hall ticket number not found');
        }
        res.json(results[0]);
    });
});



//to get the information all details//
router.get('/Results', (req, res) => {
    const getStudentsQuery = 'SELECT * FROM students;';
    
    connection.query(getStudentsQuery, (err, results) => {
      if (err) {
        console.error('Error fetching students:', err);
        return res.status(500).send('Error fetching students.');
      }
      res.status(200).json(results);
    });
  });
  

//updating the data //
router.put('/edit/:hallticketNo', (req, res) => {
    const { hallticketNo } = req.params;
    const { english, java, python, cpp } = req.body;

    // Validate marks to be within 0 to 100
    if (
        isNaN(english) || english < 0 || english > 100 ||
        isNaN(java) || java < 0 || java > 100 ||
        isNaN(python) || python < 0 || python > 100 ||
        isNaN(cpp) || cpp < 0 || cpp > 100
    ) {
        return res.status(400).send('Invalid marks. Marks should be between 0 and 100.');
    }

    const updateSubjectsQuery = `
        UPDATE subjects
        SET english = ?, java = ?, python = ?, cpp = ?
        WHERE hallticketNo = ?;
    `;

    const updateStudentMarksQuery = `
        UPDATE students
        SET totalmarks = (
                SELECT english + java + python + cpp
                FROM subjects
                WHERE subjects.hallticketNo = students.hallticketNo
            ),
            result = (
                CASE
                    WHEN (
                        SELECT english + java + python + cpp
                        FROM subjects
                        WHERE subjects.hallticketNo = students.hallticketNo
                    ) > 150 THEN 'Pass'
                    ELSE 'Fail'
                END
            )
        WHERE hallticketNo = ?;
    `;

   
    connection.query(updateSubjectsQuery, [english, java, python, cpp, hallticketNo], (err) => {
        if (err) {
            console.error('Error updating subjects:', err);
            connection.rollback(() => {
              
                res.status(500).send('Error updating subjects.');
            });
            return;
        }

        connection.query(updateStudentMarksQuery, [hallticketNo], (err) => {
            if (err) {
                console.error('Error updating student marks:', err);
                connection.rollback(() => {
                 
                    res.status(500).send('Error updating student marks.');
                });
                return;
            }

            connection.commit((err) => {
                if (err) {
                    console.error('Error committing transaction:', err);
                    connection.rollback(() => {
                       
                        res.status(500).send('Error committing transaction.');
                    });
                    return;
                }

               
                res.status(200).send('Student marks updated successfully');
            });
        });
    });
});






// API to fetch data for bar chart (total marks per student)
router.get('/barChartData', (req, res) => {
    const sql = 'SELECT stdname, totalmarks FROM students;';
    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send('Database error.');
      }
      res.json(results);
    });
  });
  




  // API to fetch data for pie chart (individual subject marks per student)
  router.get('/pieChartData', (req, res) => {
    const sql = `
      SELECT
        s.stdname,
        sc.english,
        sc.java,
        sc.python,
        sc.cpp
      FROM
        students s
      JOIN
        subjects sc ON s.hallticketNo = sc.hallticketNo;
    `;
    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send('Database error.');
      }
      res.json(results);
    });
  });




module.exports = router;