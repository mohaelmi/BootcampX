const { Pool } = require('pg');

const pool = new Pool ({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

console.log('connected');

pool.query(`
SELECT teachers.name AS teacher, cohorts.name AS cohort, COUNT(assistance_requests.*) AS total_assistances
FROM  teachers 
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2] || 'JUL02'}%'
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name; 
`)
.then(res => {
  res.rows.forEach(data => {
    console.log(`${data.cohort}: ${data.teacher}`);
  })
})
.catch(err => {
  console.log(err);
})