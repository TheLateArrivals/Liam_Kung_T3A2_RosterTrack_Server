const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { generateAuthToken } = require('../middleware/auth');


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
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user in the database by email
      const user = await User.findOne({ email });
  
      // Check if the user exists and the password is correct
      if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate an authentication token (e.g., using JWT) and send it in the response
      const token = generateAuthToken(user);
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
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
  router.post('/admin', async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Create a new user instance with admin role
      const newUser = new User({ username, password, email, role: 'admin' });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
      console.error('Error creating admin user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
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

