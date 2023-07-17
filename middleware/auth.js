const jwt = require('jsonwebtoken');

// Generate an authentication token for a user
const generateAuthToken = (user) => {
  // Create a payload with user data
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  // Generate and return a JWT
  return jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
};

module.exports = { generateAuthToken };
