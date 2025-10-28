// src/app/api/users/login.js (LOC: 1–27)
import pool from "../db/pool";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const user = rows[0];
    if (user.password !== password)
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });

    return NextResponse.json({ message: "Login successful", user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
