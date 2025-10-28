"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TheatresPage() {
  const [theatres, setTheatres] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
    total_screens: "",
  });
  const [msg, setMsg] = useState("");

  // Fetch all theatres on load
  useEffect(() => {
    fetchTheatres();
  }, []);

  async function fetchTheatres() {
    try {
      const res = await axios.get("/api/theatres");
      setTheatres(res.data);
    } catch (err) {
      console.error("Error fetching theatres:", err);
    }
  }

  async function addTheatre(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/theatres", form);
      setMsg(res.data.message || "Theatre added successfully!");
      setForm({ name: "", city: "", total_screens: "" });
      fetchTheatres();
    } catch (err) {
      console.error("Error adding theatre:", err);
    }
  }

  async function deleteTheatre(id) {
    if (!confirm("Are you sure you want to delete this theatre?")) return;
    try {
      await axios.delete(`/api/theatres/${id}`);
      fetchTheatres();
    } catch (err) {
      console.error("Error deleting theatre:", err);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">🎭 Manage Theatres</h1>

      {/* Add Theatre Form */}
      <form onSubmit={addTheatre} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Theatre Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          placeholder="Total Screens"
          value={form.total_screens}
          onChange={(e) => setForm({ ...form, total_screens: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          ➕ Add Theatre
        </button>
      </form>

      {msg && <p className="text-green-600 text-center mb-4">{msg}</p>}

      {/* Theatre List */}
      <h2 className="text-xl font-semibold mb-2">Existing Theatres</h2>
      {theatres.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Screens</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {theatres.map((t, i) => (
              <tr key={t.theatre_id || i} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2">{t.name}</td>
                <td className="border p-2">{t.city}</td>
                <td className="border p-2 text-center">{t.total_screens}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => deleteTheatre(t.theatre_id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No theatres found. Add one above.
        </p>
      )}
    </div>
  );
}
