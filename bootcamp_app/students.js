const { Pool } = require('pg');

const pool = new Pool ({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const params = process.argv.slice(2)
console.log(params[0], params[1])
pool.query(`
SELECT students.id as student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${params[0]}%'
LIMIT ${params[1] || 5};`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  });
})
.catch(err => console.error('query error', err.stack))