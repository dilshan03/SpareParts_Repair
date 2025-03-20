// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const JobCardUpdateMechanic = () => {
//   const { jobCardId } = useParams(); // Get the job card ID from the URL
//   const [jobCard, setJobCard] = useState(null);
//   const [repair, setRepair] = useState(null);
//   const [mechanic, setMechanic] = useState(null);
//   const [vehicle, setVehicle] = useState(null);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch job card details
//         const jobCardResponse = await axios.get(`/jobcards/${jobCardId}`);
//         setJobCard(jobCardResponse.data);

//         // Fetch repair details
//         const repairResponse = await axios.get(`/repairs/${jobCardResponse.data.repairId}`);
//         setRepair(repairResponse.data);

//         // Fetch mechanic details
//         const mechanicResponse = await axios.get(`/api/employees/${jobCardResponse.data.mechanicId}`);
//         setMechanic(mechanicResponse.data);

//         // Fetch vehicle details
//         const vehicleResponse = await axios.get(`/repairRequests/${repairResponse.data.vehicleNumber}`);
//         setVehicle(vehicleResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [jobCardId]);

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await axios.put(`/jobCards/${jobCardId}`, {
//         status,
//       });
//       alert("Job card status updated successfully!");
//       setJobCard(response.data);
//     } catch (error) {
//       console.error("Error updating job card:", error);
//     }
//   };

//   if (!jobCard || !repair || !mechanic || !vehicle) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2>Update Job Card Status</h2>

//       {/* Mechanic Details */}
//       <div className="card mb-4">
//         <div className="card-header">Mechanic Details</div>
//         <div className="card-body">
//           <p><strong>Name:</strong> {mechanic.firstName} {mechanic.lastName}</p>
//           <p><strong>Contact:</strong> {mechanic.phone}</p>
//           <p><strong>Email:</strong> {mechanic.email}</p>
//         </div>
//       </div>

//       {/* Vehicle Details */}
//       <div className="card mb-4">
//         <div className="card-header">Vehicle Details</div>
//         <div className="card-body">
//           <p><strong>Registration Number:</strong> {vehicle.vehicleRegiNumberR}</p>
//           <p><strong>Make:</strong> {vehicle.vehicleMakeR}</p>
//           <p><strong>Model:</strong> {vehicle.vehicleModelR}</p>
//           <p><strong>Year:</strong> {vehicle.yearOfManufactureR}</p>
//         </div>
//       </div>

//       {/* Repair Details */}
//       <div className="card mb-4">
//         <div className="card-header">Repair Details</div>
//         <div className="card-body">
//           <p><strong>Owner Name:</strong> {repair.ownerName}</p>
//           <p><strong>Issues:</strong> {repair.issueDescription.join(", ")}</p>
//           <p><strong>Status:</strong> {repair.status}</p>
//         </div>
//       </div>

//       {/* Job Card Details */}
//       <div className="card mb-4">
//         <div className="card-header">Job Card Details</div>
//         <div className="card-body">
//           <p><strong>Job Details:</strong> {jobCard.jobDetails}</p>
//           <p><strong>Current Status:</strong> {jobCard.status}</p>
//         </div>
//       </div>

//       {/* Update Status Form */}
//       <div className="card mb-4">
//         <div className="card-header">Update Status</div>
//         <div className="card-body">
//           <select
//             className="form-select mb-3"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//           <button className="btn btn-primary" onClick={handleStatusUpdate}>
//             Update Status
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobCardUpdateMechanic;