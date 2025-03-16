// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './RepairRequestList.css';

// const RepairRequestList = () => {
//   const [repairRequests, setRepairRequests] = useState([]); // State to store repair requests
//   const [loading, setLoading] = useState(true); // State to handle loading state
//   const [error, setError] = useState(null); // State to handle errors

//   // Fetch repair requests from the backend
//   useEffect(() => {
//     const fetchRepairRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/repairRequest/'); // Fetch data
//         setRepairRequests(response.data); // Update state with fetched data
//         setLoading(false); // Set loading to false
//       } catch (err) {
//         setError(err.message); // Set error message
//         setLoading(false); // Set loading to false
//       }
//     };

//     fetchRepairRequests(); // Call the function
//   }, []); // Empty dependency array ensures this runs only once

//   // Display loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Display error message
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Repair Requests</h1>
//       {repairRequests.length === 0 ? (
//         <p>No repair requests found.</p>
//       ) : (
//         <ul>
//           {repairRequests.map((request) => (
//             <li key={request._id}>
//               <h2>{request.customerNameR}</h2>
//               <p><strong>Contact Number:</strong> {request.contactNumberR}</p>
//               <p><strong>Email:</strong> {request.emailR}</p>
//               <p><strong>Address:</strong> {request.addressR}</p>
//               <p><strong>Vehicle Registration Number:</strong> {request.vehicleRegiNumberR}</p>
//               <p><strong>Vehicle Make:</strong> {request.vehicleMakeR}</p>
//               <p><strong>Vehicle Model:</strong> {request.vehicleModelR}</p>
//               <p><strong>Year of Manufacture:</strong> {request.yearOfManufactureR}</p>
//               <p><strong>Mileage:</strong> {request.mileageR}</p>
//               <p><strong>Vehicle Identification Number:</strong> {request.vehicleIdentiNumberR}</p>
//               <p><strong>Service Type:</strong> {request.serviceTypeR}</p>
//               <p><strong>Description of Issue:</strong> {request.descripIssueR}</p>
//               <p><strong>Preferred Date and Time:</strong> {new Date(request.prefDateAndTimeR).toLocaleString()}</p>
//               <p><strong>Urgency Level:</strong> {request.urgencyLevelR}</p>
//               <p><strong>Payment Method:</strong> {request.paymentMethodR}</p>
//               {request.vehiclePhotoR && (
//                 <img
//                   src={`data:${request.vehiclePhotoR.contentType};base64,${request.vehiclePhotoR.data.toString('base64')}`}
//                   alt="Vehicle"
//                   style={{ maxWidth: '200px' }}
//                 />
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RepairRequestList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination, Form, FormControl, Button, Spinner } from "react-bootstrap";

const RepairRequestList = () => {
  const [repairRequests, setRepairRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRepairRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/repairRequest/");
        setRepairRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepairRequests();
  }, []);

  // Search logic
  const filteredRequests = repairRequests.filter((request) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      request.customerNameR.toLowerCase().includes(searchLower) ||
      request.vehicleRegiNumberR.toLowerCase().includes(searchLower) ||
      request.serviceTypeR.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Count repair requests by service type
  const serviceTypeCounts = repairRequests.reduce((acc, request) => {
    acc[request.serviceTypeR] = (acc[request.serviceTypeR] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <div className="coniner mt-4">
      <h1 className="text-center mb-4">Repair Requests</h1>

      {/* Display Counts */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-6" style={{
                backgroundColor: "rgb(94, 175, 219)",
                border: "1px solid black",  // Correct format
                padding: "20px",
                borderRadius: "10px",
                fontSize:"18px"
              }}
              >
             <p><strong>Total Repair Requests:</strong>
             <br></br> {repairRequests.length}</p>
          </div>
          <div className="col-md-6"  style={{
                backgroundColor: "rgb(94, 175, 219)",
                border: "1px solid black",  // Correct format
                padding: "20px",
                borderRadius: "10px",
                fontSize:"18px"
              }}>
             <p><strong>Repair Requests by Service Type:</strong></p>
            <ul>
              {Object.entries(serviceTypeCounts).map(([serviceType, count]) => (
                <li key={serviceType} style={{textAlign: "left"}}>
                  <strong>{serviceType}</strong>: {count} requests
                </li>
              ))}
            </ul>
          </div>
        </div>
       
        
      </div>


      {/* Search Bar */}
      <Form className="mb-4">
        <FormControl
          type="text"
          placeholder="Search by Customer Name, Reg. No, or Service Type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      {/* Table */}
      <div className="table-responsive" style={{ maxHeight: "600px", overflowY: "auto", textAlign: "left" }}>
        <Table striped bordered hover className="table-sm" style={{ width: "1200px" }}>
          <thead className="sticky-top bg-light">
            <tr>
              <th>No</th>
              <th>Vehicle Photo</th>
              <th>Customer Details</th>
              <th>Vehicle Details</th>
              <th>Repair Details</th>
              <th>Service Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request, index) => (
              <tr key={request._id}>
                {/* No */}
                <td>{indexOfFirstRequest + index + 1}</td>

                {/* Vehicle Photo */}
                <td>
                  {request.vehiclePhotoR && (
                    <img
                      src={`data:${request.vehiclePhotoR.contentType};base64,${request.vehiclePhotoR.data}`}
                      alt="Vehicle"
                      className="img-thumbnail"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </td>

                {/* Customer Details */}
                <td>
                  <div><strong>Name:</strong> {request.customerNameR || "N/A"}</div>
                  <div><strong>Contact:</strong> {request.contactNumberR || "N/A"}</div>
                  <div><strong>Email:</strong> {request.emailR || "N/A"}</div>
                  <div><strong>Address:</strong> {request.addressR || "N/A"}</div>
                </td>

                {/* Vehicle Details */}
                <td>
                  <div><strong>Reg. No:</strong> {request.vehicleRegiNumberR || "N/A"}</div>
                  <div><strong>Make:</strong> {request.vehicleMakeR || "N/A"}</div>
                  <div><strong>Model:</strong> {request.vehicleModelR || "N/A"}</div>
                  <div><strong>Year:</strong> {request.yearOfManufactureR || "N/A"}</div>
                  <div><strong>Mileage:</strong> {request.mileageR || "N/A"}</div>
                  <div><strong>VIN:</strong> {request.vehicleIdentiNumberR || "N/A"}</div>
                </td>

                {/* Repair Details */}
                <td>
                  <div><strong>Description:</strong> {request.descripIssueR || "N/A"}</div>
                  <div><strong>Preferred Date:</strong> {request.prefDateAndTimeR ? new Date(request.prefDateAndTimeR).toLocaleString() : "N/A"}</div>
                  <div><strong>Urgency:</strong> {request.urgencyLevelR || "N/A"}</div>
                  <div><strong>Payment:</strong> {request.paymentMethodR || "N/A"}</div>
                </td>

                {/* Service Type */}
                <td>{request.serviceTypeR || "N/A"}</td>

                {/* Action */}
                <td>
                  <Button variant="primary" size="sm" className="me-2">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(filteredRequests.length / requestsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(filteredRequests.length / requestsPerPage) ? prev + 1 : prev
              )
            }
            disabled={currentPage === Math.ceil(filteredRequests.length / requestsPerPage)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default RepairRequestList;