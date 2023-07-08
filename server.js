const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user');
const rosterRoutes = require('./routes/roster');
const shiftsRoutes = require('./routes/shift');
app.use('/user', userRoutes);
app.use('/roster', rosterRoutes);
app.use('/shift', shiftsRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/mydatabase'; // Replace 'mydatabase' with the name of your database
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to local MongoDB');
    // Start the server after successful MongoDB connection
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
