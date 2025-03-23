import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EmployeeProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [empId] = useState(location.state.id);
  const [firstName] = useState(location.state.firstName);
  const [lastName] = useState(location.state.lastName);
  const [email] = useState(location.state.email);
  const [address] = useState(location.state.address);
  const [age] = useState(location.state.age);
  const [phone] = useState(location.state.phone);
  const [role] = useState(location.state.role);
  const [employeeType] = useState(location.state.employeeType);
  const [salary] = useState(location.state.salary);
  const [status, setStatus] = useState(location.state.status);

  // Function to update status
  async function updateStatus(newStatus) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login and retry");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/employees/${empId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus(newStatus); // Update UI state after a successful update
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-teal-600 text-white p-6 rounded-lg shadow-lg w-[800px] border border-gray-300">
        <h1 className="text-4xl font-bold text-center mb-4 uppercase">Employee Profile</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm">Employee ID:</label>
            <input value={empId} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">First Name:</label>
            <input value={firstName} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">Last Name:</label>
            <input value={lastName} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">Email:</label>
            <input value={email} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm">Address:</label>
            <input value={address} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">Age:</label>
            <input value={age} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">Phone:</label>
            <input value={phone} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">Role:</label>
            <input value={role} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">Employee Type:</label>
            <input value={employeeType} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm">Salary:</label>
            <input value={salary} disabled className="w-full p-2 border rounded bg-gray-200 text-black" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm">Status:</label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatus("Available")}
                className={`w-1/2 p-2 rounded text-white ${status === "Available" ? "bg-green-700" : "bg-green-500 hover:bg-green-600"}`}
              >
                Available
              </button>
              <button
                onClick={() => updateStatus("Not-Available")}
                className={`w-1/2 p-2 rounded text-white ${status === "Not-Available" ? "bg-red-700" : "bg-red-500 hover:bg-red-600"}`}
              >
                Not Available
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/employeeProfile/leave", { state: location.state.id })}
            className="p-2 w-1/3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Request Leave
          </button>
          <button
            onClick={() => navigate("/login")}
            className="p-2 w-1/3 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
