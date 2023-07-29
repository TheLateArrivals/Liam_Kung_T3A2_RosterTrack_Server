const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  registerUser,
  loginUser,
} = require('../controllers/user/userControl'); 

jest.mock('../models/User.js', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock('../controllers/shifts/shift', () => ({
  aggregate: jest.fn(),
}));

describe('User Control Functions', () => {
  const mockExistingUser = {
    _id: 'existingUserId',
    username: 'existinguser',
    password: 'hashed_password', 
  };

  const mockUser = {
    username: 'newuser',
    password: 'password123',
    email: 'newuser@example.com',
  };

  const mockToken = 'mocked_token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user and return a token', async () => {
      const mockHashedPassword = 'mocked_hashed_password';
      const mockCreatedUser = { ...mockUser, _id: 'newUserId' };
      const mockPayload = { id: 'newUserId' };

      bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
      jwt.sign = jest.fn().mockReturnValue(mockToken);
      require('../models/User').findOne.mockResolvedValue(null);
      require('../models/User').create.mockResolvedValue(mockCreatedUser);

      const result = await registerUser(mockUser);

      expect(result).toBe(mockToken);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
      expect(require('../models/User').findOne).toHaveBeenCalledWith({
        username: mockUser.username,
      });
      expect(require('../models/User').create).toHaveBeenCalledWith({
        email: mockUser.email,
        username: mockUser.username,
        password: mockHashedPassword,
      });
      expect(jwt.sign).toHaveBeenCalledWith(mockPayload, process.env.JWT_SECRET);
    });

    it('should return an error when username already exists', async () => {
      require('../models/User').findOne.mockResolvedValue(mockExistingUser);

      const result = await registerUser(mockUser);

      expect(result).toEqual({ error: 'Username already exists! Please try again' });
      expect(require('../models/User').findOne).toHaveBeenCalledWith({
        username: mockUser.username,
      });
      expect(require('../models/User').create).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should return an error when password is too short', async () => {
      mockUser.password = '123'; 

      const result = await registerUser(mockUser);

      expect(result).toEqual({ error: 'Your password must be more than 5 characters!' });
      expect(require('../models/User').findOne).not.toHaveBeenCalled();
      expect(require('../models/User').create).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should log in a user and return a token', async () => {
      const mockMatch = true;
      const mockPayload = { id: 'existingUserId' };

      bcrypt.compare = jest.fn().mockResolvedValue(mockMatch);
      jwt.sign = jest.fn().mockReturnValue(mockToken);
      require('../models/User').findOne.mockResolvedValue(mockExistingUser);

      const result = await loginUser({
        username: mockUser.username,
        password: mockUser.password,
      });

      expect(result).toBe(mockToken);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockUser.password, mockExistingUser.password);
      expect(require('../models/User').findOne).toHaveBeenCalledWith({
        username: mockUser.username,
      });
      expect(jwt.sign).toHaveBeenCalledWith(mockPayload, process.env.JWT_SECRET);
    });

    it('should return an error when user does not exist', async () => {
      require('../models/User').findOne.mockResolvedValue(null);

      const result = await loginUser({
        username: mockUser.username,
        password: mockUser.password,
      });

      expect(result).toEqual({ error: 'Incorrect username or password' });
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should return an error when password does not match', async () => {
      const mockMatch = false;

      bcrypt.compare = jest.fn().mockResolvedValue(mockMatch);
      require('../models/User').findOne.mockResolvedValue(mockExistingUser);

      const result = await loginUser({
        username: mockUser.username,
        password: 'incorrect_password',
      });

      expect(result).toEqual({ error: 'Incorrect username or password' });
      expect(bcrypt.compare).toHaveBeenCalledWith('incorrect_password', mockExistingUser.password);
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

});
