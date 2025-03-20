import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';

const CreateQuotation = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    vehicleNumber: '',
    items: [{ itemName: '', quantity: 0, price: 0 }],
    repairs: [{ repairType: '', price: 0 }],
    discount: 0,
    totalAmount: 0,
  });

  const [quotationId, setQuotationId] = useState(null); // Store the created quotation ID
  const navigate = useNavigate(); // For navigation

  // Calculate total amount whenever items, repairs, or discount changes
  useEffect(() => {
    const itemsTotal = formData.items.reduce((sum, item) => {
      const quantity = Number(item.quantity);
      const price = Number(item.price);
      return sum + quantity * price;
    }, 0);

    const repairsTotal = formData.repairs.reduce((sum, repair) => {
      const price = Number(repair.price);
      return sum + price;
    }, 0);

    const total = itemsTotal + repairsTotal - Number(formData.discount);
    setFormData((prevData) => ({ ...prevData, totalAmount: total }));
  }, [formData.items, formData.repairs, formData.discount]);

  // Handle input changes for customer name, email, vehicle number, and discount
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes for items
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = name === 'quantity' || name === 'price' ? Number(value) : value;
    setFormData({ ...formData, items: newItems });
  };

  // Handle changes for repairs
  const handleRepairChange = (index, e) => {
    const { name, value } = e.target;
    const newRepairs = [...formData.repairs];
    newRepairs[index][name] = name === 'price' ? Number(value) : value;
    setFormData({ ...formData, repairs: newRepairs });
  };

  // Add a new item field
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemName: '', quantity: 0, price: 0 }],
    });
  };

  // Remove an item field
  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  // Add a new repair field
  const addRepair = () => {
    setFormData({
      ...formData,
      repairs: [...formData.repairs, { repairType: '', price: 0 }],
    });
  };

  // Remove a repair field
  const removeRepair = (index) => {
    const newRepairs = formData.repairs.filter((_, i) => i !== index);
    setFormData({ ...formData, repairs: newRepairs });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/quotations', formData);
      setQuotationId(response.data._id); // Store the quotation ID
      alert('Quotation created successfully');
      // Reset form after submission
      setFormData({
        customerName: '',
        customerEmail: '',
        vehicleNumber: '',
        items: [{ itemName: '', quantity: 0, price: 0 }],
        repairs: [{ repairType: '', price: 0 }],
        discount: 0,
        totalAmount: 0,
      });
    } catch (err) {
      console.error('Error creating quotation:', err.response?.data || err.message); // Log the error
      alert('Error creating quotation: ' + (err.response?.data?.error || err.message));
    }
  };

  // Send quotation email
  const sendEmail = async () => {
    if (!quotationId) {
      alert('No quotation created yet');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/quotations/send-email/${quotationId}`);
      alert('Email sent successfully');
    } catch (err) {
      console.error('Error sending email:', err.response?.data || err.message); // Log the error
      alert('Error sending email: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom>
        Create Quotation
      </Typography>
      <Grid container spacing={2}>
        {/* Customer Name */}
        <Grid item xs={12}>
          <TextField
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>

        {/* Customer Email */}
        <Grid item xs={12}>
          <TextField
            label="Customer Email"
            name="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>

        {/* Vehicle Number */}
        <Grid item xs={12}>
          <TextField
            label="Vehicle Number"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>

        {/* Items */}
        <Grid item xs={12}>
          <Typography variant="h6">Items</Typography>
          {formData.items.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={5}>
                <TextField
                  label="Item Name"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Price (LKR)"
                  name="price"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeItem(index)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addItem}
            sx={{ mt: 1 }}
          >
            Add Item
          </Button>
        </Grid>

        {/* Repairs */}
        <Grid item xs={12}>
          <Typography variant="h6">Repairs</Typography>
          {formData.repairs.map((repair, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={5}>
                <TextField
                  label="Repair Type"
                  name="repairType"
                  value={repair.repairType}
                  onChange={(e) => handleRepairChange(index, e)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Price (LKR)"
                  name="price"
                  type="number"
                  value={repair.price}
                  onChange={(e) => handleRepairChange(index, e)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => removeRepair(index)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addRepair}
            sx={{ mt: 1 }}
          >
            Add Repair
          </Button>
        </Grid>

        {/* Discount */}
        <Grid item xs={12}>
          <TextField
            label="Discount (LKR)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Total Amount */}
        <Grid item xs={12}>
          <Typography variant="h6">
            Total Amount: LKR {formData.totalAmount.toFixed(2)}
          </Typography>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Create Quotation
          </Button>
        </Grid>

        {/* Send Email Button */}
        {quotationId && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={sendEmail}
            >
              Send Quotation via Email
            </Button>
          </Grid>
        )}

        {/* View Quotation History Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate('/quotations')}
          >
            View Quotation History
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateQuotation;