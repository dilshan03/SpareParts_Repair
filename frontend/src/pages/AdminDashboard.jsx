import React from "react";
import {Link} from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>

      <Link to="/admin/employees" className="bg-blue-500 text-white px-4 py-2 rounded">Employee dashboard</Link>

      

    </div>
  );
}
