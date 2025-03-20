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
      setQuotations(quotations.filter((q) => q._id !== id)); // Remove the deleted quotation from the list
      alert('Quotation deleted successfully');
    } catch (err) {
      console.error('Error deleting quotation:', err);
      alert('Error deleting quotation');
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
              secondary={`Vehicle: ${quotation.vehicleNumber} | Total: LKR ${quotation.totalAmount.toFixed(2)}`}
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
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default QuotationList;