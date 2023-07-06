const express = require('express');
const router = express.Router();


// POST /user/register - Register a new user
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  console.log('Received registration request:');
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('Email:', email);

  res.send('User registered successfully');
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

  