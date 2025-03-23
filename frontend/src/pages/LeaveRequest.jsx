import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LeaveRequest() {
  const location = useLocation();
  
  // Employee details from route state
  const empId = location?.state?.id || "";
  const email = location?.state?.email || "";
  const firstName = location?.state?.firstName || "";
  const lastName = location?.state?.lastName || "";

  // Leave Request State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const [leaveRequests, setLeaveRequests] = useState([]); // Store leave request data

  // Fetch employee leave requests from the database
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/leave/${empId}`);
        setLeaveRequests(response.data);
      } catch (error) {
        toast.error("Error fetching leave requests");
      }
    };

    if (empId) fetchLeaveRequests();
  }, [empId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveData = {
      id: empId,
      email,
      name: `${firstName} ${lastName}`,
      startDate,
      endDate,
      reason,
      status,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/leave", leaveData);
      toast.success(res.data.message);
      setLeaveRequests([...leaveRequests, leaveData]); // Update UI after submission
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit leave request");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Leave Request</h2>

      {/* Display Existing Leave Requests */}
      {leaveRequests.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Previous Leave Requests</h3>
          <ul className="border p-3 rounded bg-white">
            {leaveRequests.map((leave, index) => (
              <li key={index} className="border-b p-2">
                <strong>{leave.startDate} to {leave.endDate}</strong> - {leave.reason} 
                <span className={`ml-2 text-sm ${leave.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                  {leave.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Leave Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={email} disabled className="p-2 w-full border rounded bg-gray-200" />
        <input type="text" value={`${firstName} ${lastName}`} disabled className="p-2 w-full border rounded bg-gray-200" />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 w-full border rounded" required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 w-full border rounded" required />
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for leave" className="p-2 w-full border rounded" required></textarea>
        <input type="text" value={status} disabled className="p-2 w-full border rounded bg-gray-200" />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">Submit Leave Request</button>
      </form>
    </div>
  );
}
