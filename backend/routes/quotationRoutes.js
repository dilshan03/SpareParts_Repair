const express = require('express');
const {
  createQuotation,
  getQuotations,
  getQuotationById, // Add this import
  deleteQuotation,
  sendQuotationEmail,
} = require('../controllers/quotationController');
const router = express.Router();

// Create a new quotation
router.post('/', createQuotation);

// Get all quotations
router.get('/', getQuotations);

// Get a specific quotation by ID
router.get('/:id', getQuotationById); // Add this route

// Delete a quotation by ID
router.delete('/:id', deleteQuotation);

// Send quotation email
router.post('/send-email/:id', sendQuotationEmail);

module.exports = router;