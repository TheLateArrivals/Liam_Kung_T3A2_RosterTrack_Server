const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorisation');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorised. No token provided.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden. Invalid token.' });
    }

    try {
      // Fetch the user from the database based on the decoded token information (e.g., email)
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(403).json({ message: 'Forbidden. User not found.' });
      }

      // Set the user object in the request for later use
      req.user = user;
      next();
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the next middleware or route handler.
  } else {
    return res.status(403).json({ message: 'Unauthorised. You are not an admin.' });
  }
};

module.exports = { authenticateToken, isAdmin };
