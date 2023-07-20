const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');

const saltsRounds = 10;

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;


  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user instance
    
    bcrypt.hash(password.toString(), saltsRounds,  async (err, hash) => {

      if(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong"})
      }

      const newUser = new User({ username: username,password: hash, email: email });
      const user = {name : username,email:email}

      const accessToken = jwt.sign(user,process.env.SECRET_KEY)
   
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully',accessToken:accessToken });
    })
   


  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



  
  
  // POST /user/login - User login
  router.post('/login', async (req, res) => {
    const { password, email } = req.body;


    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {

   

        if(bcrypt.compareSync(password.toString(),existingUser.password)){
          const user = {name : existingUser.username,email:existingUser.email}
              
          const accessToken = jwt.sign(user,process.env.SECRET_KEY)
 
          // Save the user to the database
       
      
          res.status(200).json({ message: 'User logged in successfully',accessToken:accessToken });

        }else{
          res.status(401).json({message:"Email or Password is incorrect"})
        }
 
    
      }else{
        return res.status(409).json({ message: "User doesn't exist" });
      }
  
    
    } catch (error) {
      console.error('Error logging in user:', error);
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
      bcrypt.hash(password.toString(), saltsRounds,  async (err, hash) => {
        const newUser = new User({ username: username, password: hash, email:email, role: 'admin' });
        const user = {name : username,email:email}
  
        const accessToken = jwt.sign(user,process.env.SECRET_KEY)
        // Save the user to the database
        await newUser.save();
    
        res.status(201).json({ message: 'Admin user created successfully',accessToken:accessToken });
      })
   
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

  