

router.get('/ResultsPage/:hallticketno', (req, res) => {
    const hallticketno = req.params.hallticketno;

    let sql = `
        SELECT 
            s.stdname,
            sc.english
            sc.cpp,
            sc.java,
            sc.python,
            (sc.english+sc.cpp + sc.java + sc.python) AS total_marks,
            CASE 
                WHEN (sc.english+sc.cpp + sc.java + sc.python) > (0.5 * 400) THEN 'Pass' 
                ELSE 'Fail' 
            END AS grade
        FROM students s 
        JOIN subjects sc ON s.hallticketno = sc.hallticketno
        WHERE s.hallticketno = ?
    `;
    db.query(sql, [hallticketno], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('hallticketno not found');
        }
        res.json(results[0]);
    });
});
module.exports=router;