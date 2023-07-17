const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

// Compare the provided password with the stored password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate an authentication token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, 'your-secret-key');
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
