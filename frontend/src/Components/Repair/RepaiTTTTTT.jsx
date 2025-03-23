// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // For navigation (optional)

// const RepairList = ({ repairs }) => {
//   const navigate = useNavigate(); // For navigation (optional)

//   // Handle action button click
//   const handleViewDetails = (repairId) => {
//     console.log("View Details clicked for repair ID:", repairId);
//     // You can navigate to a details page or perform other actions
//     navigate(`/repair/${repairId}`); // Example: Navigate to a details page
//   };

//   const handleEditRepair = (repairId) => {
//     console.log("Edit clicked for repair ID:", repairId);
//     // You can navigate to an edit page or perform other actions
//     navigate(`/edit-repair/${repairId}`); // Example: Navigate to an edit page
//   };

//   return (
//     <div>
//       <h2>Repair List</h2>
//       {repairs.length === 0 ? (
//         <p>No repairs found.</p>
//       ) : (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Request Form ID</th>
//               <th style={styles.th}>Repair Status</th>
//               <th style={styles.th}>Payment Status</th>
//               <th style={styles.th}>Created At</th>
//               <th style={styles.th}>Completed At</th>
//               <th style={styles.th}>Actions</th> {/* New column for actions */}
//             </tr>
//           </thead>
//           <tbody>
//             {repairs.map((repair) => (
//               <tr key={repair._id} style={styles.tr}>
//                 <td style={styles.td}>
//                   {typeof repair.requestFormId === "object"
//                     ? repair.requestFormId._id // Extract the _id from the object
//                     : repair.requestFormId} {/* Fallback if it's not an object */}
//                 </td>
//                 <td style={styles.td}>{repair.repairCompleteStatus}</td>
//                 <td style={styles.td}>{repair.paymentStatus}</td>
//                 <td style={styles.td}>
//                   {new Date(repair.createdAt).toLocaleString()}
//                 </td>
//                 <td style={styles.td}>
//                   {repair.completedAt
//                     ? new Date(repair.completedAt).toLocaleString()
//                     : "Not Completed"}
//                 </td>
//                 <td style={styles.td}>
//                   <button
//                     style={styles.button}
//                     onClick={() => handleViewDetails(repair._id)}
//                   >
//                     View Details
//                   </button>
//                   <button
//                     style={styles.button}
//                     onClick={() => handleEditRepair(repair._id)}
//                   >
//                     Edit
//                   </button>

//                   <Button
//                         variant="info"
//                         onClick={() => handleOpen(data.repairId)}
//                         className="me-2"
//                         // disabled={!data.repairId}
//                       >
//                         Open
//                       </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const [repairs, setRepairs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchRepairs();
//   }, []);

//   const fetchRepairs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/repairs/");
//       setRepairs(response.data);
//     } catch (error) {
//       console.error("Error fetching repairs:", error);
//       setError("Failed to fetch repairs. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpen = (repairId) => {
//       console.log("Open repair request with ID:DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", repairId);
//       if (!repairId) {
//         toast.error("No repair ID found for this request form!");
//         return;
//       }
//       console.log("Open repair request with ID:", repairId);
//       navigate(`/jobcard-create/${repairId}`);
//     };


//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Repair Management System</h1>
//       {loading ? (
//         <p>Loading repairs...</p>
//       ) : error ? (
//         <p style={styles.error}>{error}</p>
//       ) : (
//         <RepairList repairs={repairs} />
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   header: {
//     textAlign: "center",
//     color: "#333",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//   },
//   th: {
//     backgroundColor: "#f2f2f2",
//     padding: "10px",
//     borderBottom: "1px solid #ddd",
//     textAlign: "left",
//   },
//   td: {
//     padding: "10px",
//     borderBottom: "1px solid #ddd",
//     textAlign: "left",
//   },
//   tr: {
//     ":hover": {
//       backgroundColor: "#f5f5f5",
//     },
//   },
//   button: {
//     margin: "0 5px",
//     padding: "5px 10px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     textAlign: "center",
//   },
// };

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import Button from "react-bootstrap/Button"; // Import Button component
import { toast } from "react-toastify"; // Import toast for notifications

const RepairList = ({ repairs, handleOpen }) => {
  console.log(repairs)
  const navigate = useNavigate(); // For navigation

  // Handle action button click
  const handleViewDetails = (repairId) => {
    console.log("View Details clicked for repair ID:", repairId);
    navigate(`/repair/${repairId}`); // Navigate to a details page
  };

  const handleEditRepair = (repairId) => {
    console.log("Edit clicked for repair ID:", repairId);
    navigate(`/edit-repair/${repairId}`); // Navigate to an edit page
  };

  return (
    <div>
      <h2>Repair List</h2>
      {repairs.length === 0 ? (
        <p>No repairs found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              {/* <th style={styles.th}>Request Form ID</th> */}
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Vehicle Details</th>
              <th style={styles.th}>Repair Status</th>
              <th style={styles.th}>Payment Status</th>
              <th style={styles.th}>Created At</th>
              <th style={styles.th}>Completed At</th>
              <th style={styles.th}>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair) => (
              <tr key={repair._id} style={styles.tr}>
                
                <td style={styles.td}>{repair.requestFormId.customerNameR}</td>
                <td style={styles.td}>{repair.requestFormId.vehicleMakeR}<br></br>
                {repair.requestFormId.vehicleIdentiNumberR}
                </td>
                <td style={styles.td}>{repair.repairCompleteStatus}</td>
                <td style={styles.td}>{repair.paymentStatus}</td>
                <td style={styles.td}>
                  {new Date(repair.createdAt).toLocaleString()}
                </td>
                <td style={styles.td}>
                  {repair.completedAt
                    ? new Date(repair.completedAt).toLocaleString()
                    : "Not Completed"}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => handleViewDetails(repair._id)}
                  >
                    View Details
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => handleEditRepair(repair._id)}
                  >
                    Edit
                  </button>
                  <Button
                    variant="info"
                    onClick={() => handleOpen(repair._id)}
                    className="me-2"
                  >
                    Add Jobs
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const App = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/repairs/get-all-repairs/");
      setRepairs(response.data);
    } catch (error) {
      console.error("Error fetching repairs:", error);
      setError("Failed to fetch repairs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (repairId) => {
    console.log("Open repair request with ID:DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", repairId);
    if (!repairId) {
      toast.error("No repair ID found for this request form!");
      return;
    }
    console.log("Open repair request with ID:", repairId);
    navigate(`/jobcard-create/${repairId}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Repair Management System</h1>
      {loading ? (
        <p>Loading repairs...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <RepairList repairs={repairs} handleOpen={handleOpen} />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  tr: {
    ":hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  button: {
    margin: "0 5px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default App;