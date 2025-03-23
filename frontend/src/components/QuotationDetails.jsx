import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const QuotationDetails = () => {
  const { id } = useParams(); // Get the quotation ID from the URL
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quotation details
  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quotations/${id}`);
        setQuotation(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching quotation details:', err);
        setError(err.response?.data?.error || 'Failed to fetch quotation details');
      } finally {
        setLoading(false);
      }
    };
    fetchQuotation();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '600px', margin: '50px auto' }}>
        <Typography variant="h4" gutterBottom>
          Error
        </Typography>
        <Typography variant="h6">{error}</Typography>
        <Button component={Link} to="/quotations" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Back to List
        </Button>
      </Paper>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Quotation Details
        </Typography>
        <Typography variant="h6">Customer: {quotation.customerName}</Typography>
        <Typography variant="h6">Email: {quotation.customerEmail}</Typography>
        <Typography variant="h6">Vehicle Number: {quotation.vehicleNumber}</Typography>
        <Typography variant="h6">Items:</Typography>
        {quotation.items.map((item, index) => (
          <Typography key={index}>
            {item.itemName} - {item.quantity} x LKR {item.price}
          </Typography>
        ))}
        <Typography variant="h6">Repairs:</Typography>
        {quotation.repairs.map((repair, index) => (
          <Typography key={index}>
            {repair.repairType} - LKR {repair.price}
          </Typography>
        ))}
        <Typography variant="h6">Discount: LKR {quotation.discount}</Typography>
        <Typography variant="h6">Total Amount: LKR {quotation.totalAmount.toFixed(2)}</Typography>
        <Button
          component={Link}
          to="/quotations"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        >
          Back to List
        </Button>
      </Paper>
    </div>
  );
};

export default QuotationDetails;