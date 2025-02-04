const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes');
const eventRoutes = require('./routes/eventroutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tracker-app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});