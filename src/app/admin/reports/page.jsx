"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("/api/payments/report").then(r => setReports(r.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daily Revenue Report</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Date</th>
            <th className="border p-2">Revenue</th>
            <th className="border p-2">Occupancy %</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td className="border p-2">{r.date}</td>
              <td className="border p-2">₹ {r.revenue}</td>
              <td className="border p-2">{r.occupancy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
