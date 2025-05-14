require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Direct server route works!');
});

// Routes
app.use('/states', require('./routes/statesRoutes'));

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
