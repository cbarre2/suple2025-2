const db = require('../config/db');

exports.findAll = async () => {
  const result = await db.query('SELECT * FROM employees');
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
  return result.rows[0];
};

exports.insert = async ({ first_name, last_name, email, hire_date, job_id, salary }) => {
  const result = await db.query(
    'INSERT INTO employees (first_name, last_name, email, hire_date, job_id, salary) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [first_name, last_name, email, hire_date, job_id, salary]
  );
  return result.rows[0];
};

exports.update = async (id, { salary }) => {
  const result = await db.query(
    'UPDATE employees SET salary = $1 WHERE employee_id = $2 RETURNING *',
    [salary, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await db.query('DELETE FROM employees WHERE employee_id = $1', [id]);
};
