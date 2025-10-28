import pool from "../db/pool";

// GET all theatres
export async function GET() {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT * FROM theatre");
    conn.release();
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// POST (Add Theatre)
export async function POST(req) {
  try {
    const { theatre_name, location, total_screens } = await req.json();
    const conn = await pool.getConnection();
    const [result] = await conn.query(
      "INSERT INTO theatre (theatre_name, location, total_screens) VALUES (?, ?, ?)",
      [theatre_name, location, total_screens]
    );
    conn.release();
    return new Response(JSON.stringify({ id: result.insertId, theatre_name, location, total_screens }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// DELETE (Remove Theatre)
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "Missing theatre_id" }), { status: 400 });

  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM theatre WHERE theatre_id = ?", [id]);
    conn.release();
    return new Response(JSON.stringify({ message: "Theatre deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
