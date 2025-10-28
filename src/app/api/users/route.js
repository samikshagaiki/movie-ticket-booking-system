// src/app/api/users/route.js (LOC: 1–41)
import pool from "../db/pool";
import { NextResponse } from "next/server";

// POST - Register user
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0)
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return NextResponse.json({ id: result.insertId, name, email });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET - Fetch all users
export async function GET() {
  const [rows] = await pool.query("SELECT id, name, email FROM users");
  return NextResponse.json(rows);
}
