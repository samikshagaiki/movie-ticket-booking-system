"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MoviesAdmin() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => { axios.get("/api/movies").then(r => setMovies(r.data)); }, []);

  async function addMovie() {
    await axios.post("/api/movies", { title });
    setTitle("");
    const res = await axios.get("/api/movies");
    setMovies(res.data);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Movies</h2>
      <div className="flex gap-2 mb-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie Title" className="border p-2 rounded flex-1" />
        <button onClick={addMovie} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {movies.map((m) => <li key={m.movie_id} className="border p-2 rounded">{m.title}</li>)}
      </ul>
    </div>
  );
}
