import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import EmployeeDetails from "../pages/EmployeeDetails";
import SalaryDetails from "../pages/SalaryDetails";
import LeaveDetails from "../pages/LeaveDetails";

export default function AdminPanel() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Admin Panel</h3>
        <div className="space-y-2">
          <h2 className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">
            Employee Dashboard
          </h2>
          <Link to="/admin/employees/details" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">
            Employee Details
          </Link>
          <Link to="/admin/employees/salary" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">
            Salary Details
          </Link>
          <Link to="/admin/employees/leaves" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">
            Leaving Details
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="details" element={<EmployeeDetails />} />
          <Route path="salary" element={<SalaryDetails />} />
          <Route path="leaves" element={<LeaveDetails />} />
        </Routes>
      </div>
    </div>
  );
}
