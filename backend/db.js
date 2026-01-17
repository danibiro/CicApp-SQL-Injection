import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Danijelszava.1025',
  database: 'sql_injection_demo',
  multipleStatements: true,
});