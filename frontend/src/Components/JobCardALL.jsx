import React, { useEffect, useState } from "react";
import axios from "axios";

const JobCardList = () => {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobCards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobcards/");
        setJobCards(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobCards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Job Cards</h1>
      {jobCards.length === 0 ? (
        <p>No job cards found.</p>
      ) : (
        <div>
          {jobCards.map((jobCard) => (
            <div key={jobCard._id} style={styles.card}>
              <h2>Job Card Details</h2>
              <p><strong>Repair ID:</strong> {jobCard.repairId._id}</p>
              <p><strong>Vehicle Number:</strong> {jobCard.repairId.vehicleNumber}</p>
              <p><strong>Mechanic Name:</strong> {jobCard.mechanicId.firstName} {jobCard.mechanicId.lastName}</p>
              <p><strong>Job Details:</strong> {jobCard.jobDetails}</p>
              <p><strong>Status:</strong> {jobCard.status}</p>
              <p><strong>Created At:</strong> {new Date(jobCard.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(jobCard.updatedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#f9f9f9",
  },
};

export default JobCardList;