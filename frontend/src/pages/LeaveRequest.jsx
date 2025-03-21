import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LeaveRequest({ user }) {
  const [leave, setLeave] = useState({
    id: "",
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });
  const [existingLeave, setExistingLeave] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leaves").then((res) => {
      const userLeave = res.data.find((l) => l.email === user.email);
      if (userLeave) setExistingLeave(userLeave);
    });
  }, [user.email]);

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/leaves", leave)
      .then(() => alert("Leave request submitted successfully"))
      .catch(() => alert("Error submitting leave request"));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/leaves/${existingLeave.id}`, {
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason,
      })
      .then(() => alert("Leave request updated successfully"))
      .catch(() => alert("Error updating leave request"));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">
        {existingLeave ? "Update Leave Request" : "Request Leave"}
      </h2>
      <form
        onSubmit={existingLeave ? handleUpdate : handleSubmit}
        className="bg-white p-6 shadow-md rounded"
      >
        {!existingLeave && (
          <>
            <label className="block mb-2">ID:</label>
            <input
              type="text"
              name="id"
              value={leave.id}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />
          </>
        )}

        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={leave.startDate}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={leave.endDate}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Reason:</label>
        <textarea
          name="reason"
          value={leave.reason}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {existingLeave ? "Update Leave Request" : "Submit Leave Request"}
        </button>
      </form>
    </div>
  );
}
