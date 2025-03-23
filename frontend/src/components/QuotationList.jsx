import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const QuotationList = () => {
  const [quotations, setQuotations] = useState([]);

  // Fetch all quotations
  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quotations');
        setQuotations(response.data);
      } catch (err) {
        console.error('Error fetching quotations:', err);
      }
    };
    fetchQuotations();
  }, []);

  // Delete a quotation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/quotations/${id}`);
      setQuotations((prev) => prev.filter((q) => q._id !== id));
      alert('Quotation deleted successfully');
    } catch (err) {
      console.error('Error deleting quotation:', err);
      alert('Error deleting quotation');
    }
  };

  // Update status to accepted or rejected
  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/quotations/${id}/status`, { status });
      console.log('Updated Quotation:', response.data); // Debugging response
      setQuotations((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status: response.data.status } : q))
      );
      alert(`Quotation status updated to ${status}`);
    } catch (err) {
      console.error('Error updating status:', err.response ? err.response.data : err.message);
      alert('Error updating status');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quotation List
      </Typography>
      <List>
        {quotations.map((quotation) => (
          <ListItem key={quotation._id}>
            <ListItemText
              primary={`Customer: ${quotation.customerName}`}
              secondary={`Vehicle: ${quotation.vehicleNumber} | Total: LKR ${quotation.totalAmount.toFixed(2)} | Status: ${quotation.status}`}
            />
            <Button
              component={Link}
              to={`/quotations/${quotation._id}`}
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(quotation._id)}
              style={{ marginRight: '10px' }}
            >
              Delete
            </Button>
            {/* Buttons to update the status */}
            {quotation.status === 'pending' && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleStatusUpdate(quotation._id, 'Accepted')}
                  style={{ marginRight: '10px' }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleStatusUpdate(quotation._id, 'Rejected')}
                >
                  Reject
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default QuotationList;
