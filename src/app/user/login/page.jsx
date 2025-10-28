"use client";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("/api/users/login", form);
    setMsg(res.data.message || "Login successful!");
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" placeholder="Email" className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
      {msg && <p className="mt-3 text-green-600">{msg}</p>}
    </div>
  );
}
