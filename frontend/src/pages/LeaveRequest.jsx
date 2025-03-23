import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LeaveRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state || {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/leave/${employee.email}`)
      .then(response => setLeaveRequests(response.data))
      .catch(error => console.error("Error fetching leave requests:", error));
  }, [employee.email]);

  const handleStartDateChange = (e) => {
    const selectedStartDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedStartDate < today) {
      setErrorMessage("Start Date cannot be in the past.");
    } else {
      setErrorMessage("");
      setStartDate(e.target.value);
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = new Date(e.target.value);
    const selectedStartDate = new Date(startDate);

    if (!startDate) {
      setErrorMessage("Please select a Start Date first.");
    } else if (selectedEndDate < selectedStartDate) {
      setErrorMessage("End Date cannot be before Start Date.");
    } else {
      setErrorMessage("");
      setEndDate(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/leave", {
        email: employee.email,
        name: `${employee.firstName} ${employee.lastName}`,
        startDate,
        endDate,
        reason,
        status: "Pending", // Default status
      });
      toast.success("Leave request submitted!");
      navigate("/employeeProfile/leave", { state: { employee } });
    } catch (error) {
      toast.error("Failed to submit leave request");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      console.error("No token found, redirecting to login...");
      navigate("/login");  // Redirect to login if token is missing
      return;
    }
  
    axios.get(`http://localhost:5000/api/leave/${employee.email}`, {
      headers: { Authorization: `Bearer ${token}` } // Add token in headers
    })
      .then(response => setLeaveRequests(response.data))
      .catch(error => console.error("Error fetching leave requests:", error));
  }, [employee.email, navigate]);
  
  

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Leave Request</h2>
        <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
        <p><strong>Email:</strong> {employee.email}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-semibold">Start Date</label>
          <input type="date" value={startDate} onChange={handleStartDateChange} className="p-2 w-full border rounded" required />
          
          <label className="block font-semibold">End Date</label>
          <input type="date" value={endDate} onChange={handleEndDateChange} className="p-2 w-full border rounded" required disabled={!startDate} />

          <label className="block font-semibold">Reason</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for leave" className="p-2 w-full border rounded" required></textarea>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600" disabled={!!errorMessage}>Submit</button>
        </form>
      </div>

      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">Leave Requests</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave, index) => (
              <tr key={leave.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{leave.startDate}</td>
                <td className="border p-2">{leave.endDate}</td>
                <td className="border p-2">{leave.reason}</td>
                <td className={`border p-2 font-bold ${leave.status === "Approved" ? "text-green-600" : leave.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                  {leave.status}
                </td>
                <td className="border p-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => navigate("/update-leave", { state: { leave } })}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
