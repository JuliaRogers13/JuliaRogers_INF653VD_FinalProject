require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB');
const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/states', require('./routes/statesRoutes'));

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
