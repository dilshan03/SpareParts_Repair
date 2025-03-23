import React from 'react';
import Navbar from './Components/NavBar';
import Hero from './Components/Hero';
import Categories from './Components/Categories';
import Footer from './Components/Footer';
import AdminDashboard from './Components/AdminDashboard';
import Login from './pages/Login';
import StaffPage from './Components/StaffPage';
import AboutUsPage from './Components/AboutUsPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//import Sidebar from "./Components/Sidebar"; // Import Sidebar component


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/staff" element={<StaffPage />} />
        {/*<Route path="/repair" element={<RepairPage />} />*/}
        {/*<Route path="/service" element={<ServicePage />} />*/}
        <Route path="/about-us" element={<AboutUsPage />} />
        {/*<Route path="/staff-login" element={<StaffLogin />} />*/}

        
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/*}
        <Route path="/admin/employees/*" element={<AdminPanel  />} />

        <Route path="/employeeProfile" element={<EmployeeProfile />} />
        <Route path="/employeeProfile/leave" element={<LeaveRequest/>} />

        <Route path="/api/reset-password" element={< UpdatePassword/>} />*/}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
