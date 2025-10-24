import pool from "../db/pool";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const conn = await pool.getConnection();

    const [exists] = await conn.query("SELECT * FROM users WHERE email = ?", [email]);
    if (exists.length) {
      conn.release();
      return new Response(JSON.stringify({ error: "Email already registered" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await conn.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    conn.release();
    return new Response(JSON.stringify({ message: "User registered", id: result.insertId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
