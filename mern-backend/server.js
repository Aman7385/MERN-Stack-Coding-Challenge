// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api'); // Import API routes

const app = express();  // Initialize the express app

// Middleware
app.use(express.json());  // Parse incoming requests with JSON payloads
app.use(cors());  // Enable CORS for cross-origin requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Mount the routes
app.use('/api', apiRoutes);  // All API routes

module.exports = app;  // Export the app to be used in server.js
