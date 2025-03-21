import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import EmployeeDetails from "../pages/EmployeeDetails";
import SalaryDetails from "../pages/SalaryDetails";
import LeaveDetails from "../pages/LeaveDetails";
import AdminEditEmployee from "../pages/AdminEditEmployee";
import AdminAddEmployee from "../pages/AdminAddEmployee";
import AdminGenarateSalary from "../pages/AdminGenarateSalary";

export default function AdminPanel() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Employee Dashboard</h3>
        <div className="space-y-2">
         
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
        <Routes >

          <Route path="/edit" element={<AdminEditEmployee  />} />
          <Route path="/details" element={<EmployeeDetails />} />
          <Route path="/addemp" element={<AdminAddEmployee />} />
          <Route path="/salary" element={<SalaryDetails />} />
          <Route path="/leaves" element={<LeaveDetails />} />
          <Route path="/salary/new" element={<AdminGenarateSalary />} />

        </Routes>
      </div>
    </div>
  );
}
