import { NextResponse } from "next/server";
import pool from "../db/pool";

// -----------------------------
// POST: Create a Booking
// -----------------------------
export async function POST(req) {
  const connection = await pool.getConnection();
  try {
    const { user_id, show_id, seat_numbers } = await req.json();

    await connection.beginTransaction();

    // Step 1: Check if seats are available
    const [existing] = await connection.query(
      `SELECT seat_no FROM bookings WHERE show_id = ? AND seat_no IN (?)`,
      [show_id, seat_numbers]
    );

    if (existing.length > 0) {
      throw new Error(`Seats already booked: ${existing.map(s => s.seat_no).join(", ")}`);
    }

    // Step 2: Insert each booked seat
    for (const seat of seat_numbers) {
      await connection.query(
        `INSERT INTO bookings (user_id, show_id, seat_no, status)
         VALUES (?, ?, ?, 'CONFIRMED')`,
        [user_id, show_id, seat]
      );
    }

    await connection.commit();
    return NextResponse.json({ success: true, message: "Booking successful!" });

  } catch (error) {
    await connection.rollback();
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}

// -----------------------------
// GET: Fetch Bookings for a User
// -----------------------------
export async function GET(req) {
  const connection = await pool.getConnection();
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    const [rows] = await connection.query(
      `SELECT b.booking_id, m.title AS movie, s.show_time, b.seat_no, b.status
       FROM bookings b
       JOIN \`show\` s ON b.show_id = s.show_id
       JOIN movie m ON s.movie_id = m.movie_id
       WHERE b.user_id = ?`,
      [user_id]
    );

    return NextResponse.json(rows);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}
