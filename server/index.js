const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); // <--- ADD THIS

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tracker-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true
}));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Handle all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
