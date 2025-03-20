import React, { useState } from "react";
import axios from "axios";

export default function UpdatePassword({ user }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/employees/resetpassword/${user.id}`, { password })
      .then(() => alert("Password Updated Successfully"))
      .catch(() => alert("Error updating password"));
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Password</h2>
      <input type="password" className="border p-2 w-full mb-4" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
