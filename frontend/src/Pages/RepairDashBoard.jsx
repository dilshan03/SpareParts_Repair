// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";


// function DashBoard() {

//     return(

        

        
//         // <Link to="/regGEmread" style={styles.sidebarLink}>
//         //   <i className="fas fa-home"> </i> Home
//         // </Link>

//         <Routes>
//             <Route path="/" element={<RepairRequestForm />} />
//             <Route path="/repairRequest/:id" element={<RepairRequestFromUpdate/>} />
//             <Route path="/jobcard-create/:repairId" element={<JobCardCreate/>} />
//             <Route path="/" element={<RepairRequestList/>} />
//             <Route path="/" element={<RepairTable/> } />
            
//         </Routes>
//     );
// }

// export default DashBoard;
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import RepairRequestForm from "../Components/RepairRequestFrom"; // Import your components
import JobCardCreate from '../Components/Repair/JobCardCreate';
import RepairRequestFromUpdate from "../Components/RepairRequestFromUpdate";
// import JobCardCreate from "./JobCardCreate";
import RepairRequestList from "../Components/RepairRequestList";
import RepaiTTTTTT from "../Components/Repair/RepaiTTTTTT";
import JobCardList from "../Components/Repair/JobCardList";
// import RepairTable from "./RepairTable";

function DashBoard() {
  return (
    <div style={styles.body}>
      {/* Header Navigation Bar */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>
          <b>B</b> Repair Management System
        </h2>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>
            <i className="fas fa-home"> </i> Home
          </Link>
          <Link to="/RepairReqList" style={styles.navLink}>
            <i className="fas fa-box"> </i> Repair Requests
          </Link>
          <Link to="/AllRepair" style={styles.navLink}>
            <i className="fas fa-plus "></i> Repair
          </Link>
          <Link to="/jobCardList" style={styles.navLink}>
            <i className="fas fa-users"></i> All Job Cards 
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Routes>
          <Route path="/RepairReqFrom" element={<RepairRequestForm />} />
          <Route path="/RepairReqList" element={<RepairRequestList />} />
          <Route path="/repair-requests/:id" element={<RepairRequestFromUpdate />} />
          {/* <Route path="/jobcards" element={<RepairTable />} /> */}
          <Route path="/jobcard-create/:repairId" element={<JobCardCreate />} />
          <Route path="/AllRepair" element={<RepaiTTTTTT/>} />
          <Route path="/jobCardList" element={<JobCardList/>} />
        </Routes>
        
      
      </div>
    </div>
  );
}

// Styles
const styles = {
  body: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
  },
};

export default DashBoard;