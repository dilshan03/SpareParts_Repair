import React, { useState } from "react";
import axios from "axios";

const JobCardForm = ({ jobCard, onSave }) => {
  const [formData, setFormData] = useState({
    repairId: jobCard ? jobCard.repairId : "",
    mechanicId: jobCard ? jobCard.mechanicId : "",
    jobDetails: jobCard ? jobCard.jobDetails : "",
    status: jobCard ? jobCard.status : "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (jobCard) {
        // Update existing job card
        await axios.put(`http://localhost:5000/jobcards/${jobCard._id}`, formData);
      } else {
        // Create new job card
        await axios.post("http://localhost:5000/jobcards", formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving job card:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Repair ID:</label>
        <input
          type="text"
          name="repairId"
          value={formData.repairId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Mechanic ID:</label>
        <input
          type="text"
          name="mechanicId"
          value={formData.mechanicId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Job Details:</label>
        <textarea
          name="jobDetails"
          value={formData.jobDetails}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">{jobCard ? "Update" : "Create"} Job Card</button>
    </form>
  );
};

export default JobCardForm;