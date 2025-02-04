// server/routes/eventRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Protected route
router.get('/events', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Welcome to the events page!' });
});

module.exports = router;