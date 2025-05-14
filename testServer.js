const express = require('express');
const app = express();
const PORT = 4000;

app.get('/test', (req, res) => {
  res.send('This test route works!');
});

app.listen(PORT, () => console.log(`Test server running on port ${PORT}`));
