const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Load environment variables from .env file
require('dotenv').config();

// Use the connection string from .env file
const DB_URI = process.env.MONGODB_URI;


// Enable cross-origin resource sharing (CORS) to allow requests from a different origin (e.g. the frontend)
app.use(cors());

// Parse the request body as JSON
app.use(bodyParser.json());

// Static folders for accessing uploads
app.use('/images', express.static(path.join(__dirname, 'upload/song')));
app.use('/url', express.static(path.join(__dirname, 'upload/songaudio')));

// Connect to MongoDB
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/', authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));