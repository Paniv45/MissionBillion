const express = require('express');
const router = express.Router();

// Mock data for demonstration
const chapters = {
  Physics: ['Chapter 1', 'Chapter 2', 'Chapter 3'],
  Chemistry: ['Chapter 1', 'Chapter 2', 'Chapter 3'],
  Maths: ['Chapter 1', 'Chapter 2', 'Chapter 3'],
};

// Route to get chapters based on class
router.get('/', (req, res) => {
  const { class: selectedClass } = req.query;
  
  // Replace with actual logic to fetch chapters from database
  res.json(chapters);
});

module.exports = router;
