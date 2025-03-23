import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./JobCardCreate.css";

const JobCardCreate = () => {
  const { repairId } = useParams(); // Get repairId from URL
  const navigate = useNavigate(); // For navigation
  const [loading, setLoading] = useState(false);
  const [mechanics, setMechanics] = useState([]); // State to store mechanics
  const [assignedMechanic, setAssignedMechanic] = useState(""); // State for assigned mechanic
  const [jobs, setJobs] = useState([
    { jobName: "", jobDescription: "", jobStatus: "Pending", jobCost: 0 },
  ]);
  // Fetch mechanics from the backend
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees/"); // Adjust the endpoint as needed
        setMechanics(response.data);
        console.log("Mechanics data:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM", response.data);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
        toast.error("Failed to fetch mechanics!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchMechanics();
  }, []);

  // Handle job input change
  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...jobs];
    updatedJobs[index][field] = value;
    setJobs(updatedJobs);
  };

  // Add a new job
  const addJob = () => {
    setJobs([...jobs, { jobName: "", jobDescription: "", jobStatus: "Pending", jobCost: 0 }]);
  };

  // Remove a job
  const removeJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log('11111111111111111')   
    setMechanics();
    setLoading(true);

    // Log the request payload for debugging
    console.log("Request Payload:", {
      repairId,
      assignedMechanic,
      jobs,
    });

    try {
      const response = await axios.post("http://localhost:5000/jobCards", {
        repairId,
        assignedMechanic,
        jobs,
      });

      toast.success("Job Card created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/"); // Navigate back to the main page
    } catch (error) {
      console.error("Error creating job card:", error);
      toast.error("Failed to create job card!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="container mt-4">
      <h1>Create Job Card for Repair ID: {repairId}</h1>
      <Form onSubmit={handleSubmit}>
        {/* Assigned Mechanic Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Assigned Mechanic</Form.Label>
          <Form.Control
            as="select"
            value={assignedMechanic}
            onChange={(e) => setAssignedMechanic(e.target.value)}
            required
          >
            <option value="">Select a mechanic</option>
            {mechanics.map((mechanic) => (
              <option key={mechanic._id} value={mechanic._id}>
                {mechanic.firstName} {mechanic.lastName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Job List */}
        {jobs.map((job, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <h4>Job #{index + 1}</h4>
            <Form.Group className="mb-3">
              <Form.Label>Job Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job name"
                value={job.jobName}
                onChange={(e) => handleJobChange(index, "jobName", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter job description"
                value={job.jobDescription}
                onChange={(e) => handleJobChange(index, "jobDescription", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter job cost"
                value={job.jobCost}
                onChange={(e) => handleJobChange(index, "jobCost", e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="danger" onClick={() => removeJob(index)}>
              Remove Job
            </Button>
          </div>
        ))}

        {/* Add Job Button */}
        <Button variant="primary" onClick={addJob} className="me-2">
          Add Job
        </Button>

        {/* Submit Button */}
        <Button variant="success" type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Create Job Card"}
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default JobCardCreate;


