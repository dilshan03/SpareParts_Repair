import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobCardList = () => {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all job cards
  useEffect(() => {
    const fetchJobCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/jobCards");
        setJobCards(response.data);
      } catch (error) {
        console.error("Error fetching job cards:", error);
        toast.error("Failed to fetch job cards!", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobCards();
  }, []);

  // Navigate to job card details
  const handleViewDetails = (jobCardId) => {
    navigate(`/jobCards/${jobCardId}`);
  };

  return (
    <div className="container mt-4">
      <h1>Job Cards</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : jobCards.length === 0 ? (
        <p>No job cards found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Repair ID</th>
              <th>Assigned Mechanic</th>
              <th>Jobs</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobCards.map((jobCard, index) => (
              <tr key={jobCard._id}>
                <td>{index + 1}</td>
                <td>{jobCard.repairId?._id || "N/A"}</td>
                <td>
                  {jobCard.assignedMechanic
                    ? `${jobCard.assignedMechanic.firstName} ${jobCard.assignedMechanic.lastName}`
                    : "N/A"}
                </td>
                <td>
                  <ul>
                    {jobCard.jobs.map((job, i) => (
                      <li key={i}>
                        {job.jobName} - {job.jobStatus}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(jobCard.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewDetails(jobCard._id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ToastContainer />
    </div>
  );
};

export default JobCardList;