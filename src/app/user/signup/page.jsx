"use client";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users", form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.error || "Error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>
        <input className="border w-full p-2 mb-2" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="border w-full p-2 mb-2" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="border w-full p-2 mb-2" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 text-white p-2 rounded w-full">Register</button>
        {msg && <p className="text-sm text-center mt-2 text-gray-600">{msg}</p>}
      </form>
    </div>
  );
}
