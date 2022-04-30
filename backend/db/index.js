const mysql = require('mysql2');
const { PASSWORD, HOST, USER, DATABASE } = require('../config');

const pool = mysql.createPool({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
});

module.exports = {
  db: pool.promise(),
};
