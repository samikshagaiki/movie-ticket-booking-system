import pool from "../db/pool";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const conn = await pool.getConnection();
    const [users] = await conn.query("SELECT * FROM users WHERE email = ?", [email]);
    conn.release();

    if (users.length === 0)
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 401 });

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });

    const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return new Response(JSON.stringify({ message: "Login successful", token }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
