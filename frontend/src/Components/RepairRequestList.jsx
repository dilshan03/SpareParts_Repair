import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RepairRequestList.css';

const RepairRequestList = () => {
  const [repairRequests, setRepairRequests] = useState([]); // State to store repair requests
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch repair requests from the backend
  useEffect(() => {
    const fetchRepairRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/repairRequest/'); // Fetch data
        setRepairRequests(response.data); // Update state with fetched data
        setLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchRepairRequests(); // Call the function
  }, []); // Empty dependency array ensures this runs only once

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Repair Requests</h1>
      {repairRequests.length === 0 ? (
        <p>No repair requests found.</p>
      ) : (
        <ul>
          {repairRequests.map((request) => (
            <li key={request._id}>
              <h2>{request.customerNameR}</h2>
              <p><strong>Contact Number:</strong> {request.contactNumberR}</p>
              <p><strong>Email:</strong> {request.emailR}</p>
              <p><strong>Address:</strong> {request.addressR}</p>
              <p><strong>Vehicle Registration Number:</strong> {request.vehicleRegiNumberR}</p>
              <p><strong>Vehicle Make:</strong> {request.vehicleMakeR}</p>
              <p><strong>Vehicle Model:</strong> {request.vehicleModelR}</p>
              <p><strong>Year of Manufacture:</strong> {request.yearOfManufactureR}</p>
              <p><strong>Mileage:</strong> {request.mileageR}</p>
              <p><strong>Vehicle Identification Number:</strong> {request.vehicleIdentiNumberR}</p>
              <p><strong>Service Type:</strong> {request.serviceTypeR}</p>
              <p><strong>Description of Issue:</strong> {request.descripIssueR}</p>
              <p><strong>Preferred Date and Time:</strong> {new Date(request.prefDateAndTimeR).toLocaleString()}</p>
              <p><strong>Urgency Level:</strong> {request.urgencyLevelR}</p>
              <p><strong>Payment Method:</strong> {request.paymentMethodR}</p>
              {request.vehiclePhotoR && (
                <img
                  src={`data:${request.vehiclePhotoR.contentType};base64,${request.vehiclePhotoR.data.toString('base64')}`}
                  alt="Vehicle"
                  style={{ maxWidth: '200px' }}
                />
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepairRequestList;