const Quotation = require('../models/Quotation');
const { generatePDF } = require('../utils/pdfGenerator');
const nodemailer = require('nodemailer');

// Create Quotation
exports.createQuotation = async (req, res) => {
  try {
    const { customerName, customerEmail, vehicleNumber, items, repairs, discount } = req.body;

    // Calculate total amount
    const itemsTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const repairsTotal = repairs.reduce((sum, repair) => sum + repair.price, 0);
    const totalAmount = itemsTotal + repairsTotal - discount;

    // Create new quotation
    const quotation = new Quotation({
      customerName,
      customerEmail,
      vehicleNumber,
      items,
      repairs,
      discount,
      totalAmount,
    });

    // Save to database
    await quotation.save();

    // Return the created quotation
    res.status(201).json(quotation);
  } catch (err) {
    console.error('Error creating quotation:', err); // Log the error
    res.status(400).json({ error: err.message });
  }
};

// Get all quotations
exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (err) {
    console.error('Error fetching quotations:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Get a specific quotation by ID
exports.getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.status(200).json(quotation);
  } catch (err) {
    console.error('Error fetching quotation by ID:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Delete a quotation by ID
exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.status(200).json({ message: 'Quotation deleted successfully' });
  } catch (err) {
    console.error('Error deleting quotation:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Send Quotation Email
exports.sendQuotationEmail = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(quotation);

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: quotation.customerEmail,
      subject: 'Your Quotation',
      text: 'Please find your quotation attached.',
      attachments: [
        {
          filename: 'quotation.pdf',
          content: pdfBuffer,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};