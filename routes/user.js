const express = require('express');
const router = express.Router();
const { User } = require('../models/User');


// POST /user/register - Register a new user
// POST /user/register - Register a new user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ username, password, email });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



  
  
  // POST /user/login - User login
  router.post('/login', (req, res) => {
    res.send('User logged in successfully');
  });
  
  // GET /user/logout - User logout
  router.get('/logout', (req, res) => {
    res.send('User logged out successfully');
  });
  
  // GET /user/profile - Get user profile
  router.get('/profile', (req, res) => {
    res.send('User profile retrieved successfully');
  });

  // POST /user/admin - Create a new admin user
router.post('/admin', (req, res) => {
    res.send('Admin user created successfully');
  });
  
  // PUT /user/:id/admin - Grant admin privileges to a user
router.put('/:id/admin', (req, res) => {
    res.send('User role updated to admin successfully');
  });

  // GET /user/admin - Get a list of admin users
router.get('/admin', (req, res) => {
    res.send('List of admin users retrieved successfully');
  });
  
  




module.exports = router;

  