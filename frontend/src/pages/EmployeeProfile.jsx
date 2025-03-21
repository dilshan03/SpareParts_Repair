import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function EmployeeProfile() {

  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== email) {
      navigate("/login"); // Redirect if user not found or mismatched email
    } else {
      setUser(storedUser);
    }
  }, [email, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Profile</h2>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Employee Type:</strong> {user.employeeType}</p>
      <p><strong>Salary:</strong> ${user.salary}</p>
      <p><strong>Status:</strong> {user.status}</p>

      <div className="mt-4">
        <a href="/update-password" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update Password</a>
        <a href="/update-status" className="bg-green-500 text-white px-4 py-2 rounded">Update Status</a>
        <a href="/leaves" className="bg-green-500 text-white px-4 py-2 rounded">Request Leave</a>
      </div>
    </div>
  );
}
