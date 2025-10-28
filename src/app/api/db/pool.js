// src/app/api/db/pool.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',               // change to your MySQL username
  password: 'root',  // change to your MySQL password
  database: 'movie_booking_db',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
