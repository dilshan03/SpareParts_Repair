import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import EmployeeProfile from "./pages/EmployeeProfile";
import AdminDashboard from "./pages/AdminDashboard";
import UpdatePassword from "./pages/UpdatePassword";
import Login from "./pages/Login";
import AdminPanel from "./components/AdminPanel";
import LeaveRequest from "./pages/LeaveRequest";



export default function App() {
  

  return (
    <Router>
      <Routes path="*/">

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/employees/*" element={<AdminPanel  />} />

        <Route path="/employeeProfile" element={<EmployeeProfile />} />
        <Route path="/employeeProfile/leave" element={<LeaveRequest/>} />

        <Route path="/api/reset-password" element={< UpdatePassword/>} />
        
      </Routes>
    </Router>
  );
}