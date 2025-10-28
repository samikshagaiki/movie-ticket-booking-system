import pool from '../db/pool.js';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT s.show_id, m.title AS movie, t.name AS theatre, sc.screen_name, s.show_date, s.show_time
      FROM SHOWS s
      JOIN MOVIE m ON s.movie_id = m.movie_id
      JOIN SCREEN sc ON s.screen_id = sc.screen_id
      JOIN THEATRE t ON sc.theatre_id = t.theatre_id
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error('GET error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { movie_id, screen_id, show_date, show_time } = await req.json();
    const [result] = await pool.query(
      'INSERT INTO SHOWS (movie_id, screen_id, show_date, show_time) VALUES (?, ?, ?, ?)',
      [movie_id, screen_id, show_date, show_time]
    );
    return new Response(JSON.stringify({ show_id: result.insertId, message: 'Show added!' }), { status: 200 });
  } catch (err) {
    console.error('POST error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
