import React, { useEffect, useState } from "react";
import axios from "axios";

const RepairTable = () => {
  const [repairs, setRepairs] = useState([]);

  // Fetch repairs from the backend
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/repairs/");
        setRepairs(response.data);
      } catch (error) {
        console.error("Error fetching repairs:", error);
      }
    };

    fetchRepairs();
  }, []);

  return (
    <div>
      <h2>Repairs</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Owner Name</th>
            <th>Issue Description</th>
            <th>Assigned Mechanic</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {repairs.map((repair) => (
            <tr key={repair._id}>
              <td>{repair.vehicleNumber}</td>
              <td>{repair.ownerName}</td>
              <td>
                <ul>
                  {repair.issueDescription.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </td>
              <td>{repair.assignedMechanic ? repair.assignedMechanic.name : "Not Assigned"}</td>
              <td>{repair.status}</td>
              <td>{new Date(repair.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepairTable;