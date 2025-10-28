"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SeatSelector from "@/components/SeatSelector";

export default function Booking() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => { axios.get("/api/shows").then(r => setShows(r.data)); }, []);

  async function bookNow() {
    const res = await axios.post("/api/bookings", {
      user_id: 1, show_id: selectedShow, seat_ids: selectedSeats
    });
    setMsg(res.data.message || "Booking successful!");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book Your Seats</h2>
      <select className="border p-2 rounded mb-4"
        onChange={(e) => setSelectedShow(e.target.value)}>
        <option value="">Select Show</option>
        {shows.map((s) => (
          <option key={s.show_id} value={s.show_id}>
            Movie #{s.movie_id} — {s.start_time}
          </option>
        ))}
      </select>

      {selectedShow && (
        <SeatSelector selected={selectedSeats} setSelected={setSelectedSeats} />
      )}

      <button onClick={bookNow}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Confirm Booking
      </button>

      {msg && <p className="mt-3 text-green-600">{msg}</p>}
    </div>
  );
}
