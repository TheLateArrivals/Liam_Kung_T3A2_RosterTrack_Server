const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
