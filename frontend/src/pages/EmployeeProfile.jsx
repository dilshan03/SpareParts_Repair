import React from "react";

export default function EmployeeProfile({ user }) {
  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Profile</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Employee Type:</strong> {user.employeeType}</p>
      <p><strong>Salary:</strong> ${user.salary}</p>
      <p><strong>Status:</strong> {user.status}</p>

      <div className="mt-4">
        <a href="/update-password" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update Password</a>
        <a href="/update-status" className="bg-green-500 text-white px-4 py-2 rounded">Update Status</a>
      </div>
    </div>
  );
}
