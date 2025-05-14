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

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>States API</title>
      </head>
      <body>
        <h1>Welcome to the States API by Julia Rogers for Back End Web Development!</h1>
        <p>Try visiting <code>/states</code> or <code>/states/:state</code> for more info.</p>
      </body>
    </html>
  `);
});

// Routes
app.use('/states', require('./routes/statesRoutes'));

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
