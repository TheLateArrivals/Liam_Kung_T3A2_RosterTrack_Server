// Import required module for the application
const mongoose = require('mongoose');

// Define a Mongoose schema for the User collection in MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // The "username" field is required for every user document
  },
  password: {
    type: String,
    required: true, // The "password" field is required for every user document
  },
  email: {
    type: String,
    required: true, // The "email" field is required for every user document
    unique: true, // Ensure that each email is unique in the User collection
  },
  is_admin: {
    type: Boolean,
    default: false, // The "is_admin" field is a Boolean, and its default value is set to false if not specified
    required: true, // The "is_admin" field is required for every user document
  }
});

// Create a Mongoose model named 'User' based on the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model to be used in other modules
module.exports = User;
