import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeDetails from "./pages/EmployeeDetails";
import AdminDashboard from "./pages/AdminDashboard";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateStatus from "./pages/UpdateStatus";
import Login from "./pages/Login";
import AdminPanel from "./components/AdminPanel";
import AdminEditEmployee from "./pages/AdminEditEmployee";
import SalaryDetails from "./pages/SalaryDetails";
import LeaveDetails from "./pages/LeaveDetails";


export default function App() {
  

  return (
    <Router>
      <Routes path="*/">

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/employees/*" element={<AdminPanel  />} />

        <Route path="/admin/employees/edit/:id" element={<AdminEditEmployee  />} />

        <Route path="/admin/employees/salary" element={<SalaryDetails />} />

        <Route path="/admin/employees/leave" element={<LeaveDetails />} />


        

        {/* Protected Admin Route */}
        {/*<Route
          path="/admin"
          element={user?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        /> */}

        {/* Employee Dashboard Route (Admin Only) */}
        {/*<Route
          path="/admin/employees"
          element={user?.role === "Admin" ? <EmployeeDashboard /> : <Navigate to="/login" />}
        />*/}

        {/* Employee Profile Route */}
        {/*<Route path="/admin/employees/:id" element={<EmployeeProfile />} />

        {/* Update Employee Status */}
        {/*<Route path="/admin/employees/:id/update-status" element={<UpdateStatus />} />

        {/* Update Employee Password */}
        {/*<Route path="/admin/employees/:id/update-password" element={<UpdatePassword />} />

        {/* Default Redirect */}
        {/*<Route path="*" element={<Navigate to="/login" />} />*/}
      </Routes>
    </Router>
  );
}
