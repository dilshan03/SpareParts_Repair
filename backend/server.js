
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
// const repairRoutes = require('./routes/RepairRequestFormRoutes.js');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Use routes *AFTER* initializing app
// app.use('/api', repairRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('MERN Stack App is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';



// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// // Import routes
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));