const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Importing auth routes
const chapterRoutes = require('./routes/chapterRoutes'); // Importing chapter routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes); // Mount auth routes
app.use('/api', chapterRoutes); // Mount chapter routes

// Start server
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost/your-db-name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
