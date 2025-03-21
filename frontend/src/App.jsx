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
import AddEmployee from "./pages/AddEmployee";


export default function App() {
  

  return (
    <Router>
      <Routes path="*/">

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employeeProfile" element={<EmployeeProfile />} />
        <Route path="/admin/employees/*" element={<AdminPanel  />} />
      </Routes>
    </Router>
  );
}
