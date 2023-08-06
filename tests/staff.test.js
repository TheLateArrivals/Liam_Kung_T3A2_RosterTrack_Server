const mongoose = require('mongoose');
const Staff = require('../models/Staff'); 

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/testing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Staff Model', () => {
  it('should create and save a new staff successfully', async () => {
    const mockStaff = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    };
    const staff = new Staff(mockStaff);
    const savedStaff = await staff.save();

    expect(savedStaff._id).toBeDefined();
    expect(savedStaff.firstName).toBe(mockStaff.firstName);
    expect(savedStaff.lastName).toBe(mockStaff.lastName);
    expect(savedStaff.email).toBe(mockStaff.email);
  });

  it('should not save a staff without required fields', async () => {
    const staff = new Staff();

    try {
      await staff.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.firstName).toBeDefined();
      expect(error.errors.lastName).toBeDefined();
      expect(error.errors.email).toBeDefined();
    }
  });
});
