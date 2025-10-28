import pool from "../db/pool.js";

// GET all movies with theatre name (JOIN)
export async function GET() {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(`
      SELECT m.movie_id, m.title, m.genre, m.duration, m.rating,
             DATE_FORMAT(m.release_date, '%Y-%m-%d') AS release_date,
             t.theatre_name
      FROM movie m
      LEFT JOIN theatre t ON m.theatre_id = t.theatre_id
    `);
    conn.release();
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// POST (Add Movie)
export async function POST(req) {
  try {
    const { title, genre, duration, rating, release_date, theatre_id } = await req.json();
    const conn = await pool.getConnection();
    const [result] = await conn.query(
      `INSERT INTO movie (title, genre, duration, rating, release_date, theatre_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, genre, duration, rating, release_date, theatre_id]
    );
    conn.release();
    return new Response(JSON.stringify({ id: result.insertId, title }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// PUT (Update Movie)
export async function PUT(req) {
  try {
    const { movie_id, title, genre, duration, rating, release_date, theatre_id } = await req.json();
    const conn = await pool.getConnection();
    await conn.query(
      `UPDATE movie 
       SET title=?, genre=?, duration=?, rating=?, release_date=?, theatre_id=?
       WHERE movie_id=?`,
      [title, genre, duration, rating, release_date, theatre_id, movie_id]
    );
    conn.release();
    return new Response(JSON.stringify({ message: "Movie updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// DELETE (Remove Movie)
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "Missing movie_id" }), { status: 400 });

  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM movie WHERE movie_id = ?", [id]);
    conn.release();
    return new Response(JSON.stringify({ message: "Movie deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
