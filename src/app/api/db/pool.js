import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Shraddha@123', // your MySQL password
  database: 'dbms_project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✓ Database Connected');
    conn.release();
  } catch (err) {
    console.error('✗ Database Error:', err);
  }
}

testConnection(); // runs once when server starts

export default pool;
