const { findShifts, getShifts, createShift, updateShift } = require('../controllers/shifts/shiftControl'); 
const Shift = require('../models/Shifts'); 

jest.mock('../models/Shifts', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

describe('Shift Control Functions', () => {
  const mockShift = {
    _id: 'shiftId',
    day: 'Monday',
    date: new Date('2023-07-31T09:00:00Z'),
    employee_id: 'employeeId',
    startTime: new Date('2023-07-31T09:00:00Z'),
    endTime: new Date('2023-07-31T17:00:00Z'),
    location: 'Office A',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findShifts', () => {
    it('should find all shifts', async () => {
      const mockShifts = [mockShift, mockShift];
      Shift.find.mockResolvedValue(mockShifts);

      const result = await findShifts({});

      expect(result).toEqual(mockShifts);
      expect(Shift.find).toHaveBeenCalledWith({});
    });
  });

  describe('getShifts', () => {
    it('should find a specific shift by ID', async () => {
      Shift.findById.mockResolvedValue(mockShift);

      const result = await getShifts('shiftId');

      expect(result).toEqual(mockShift);
      expect(Shift.findById).toHaveBeenCalledWith('shiftId');
    });
  });

  describe('createShift', () => {
    it('should create a new shift', async () => {
      Shift.create.mockResolvedValue(mockShift);

      const result = await createShift(mockShift);

      expect(result).toEqual(mockShift);
      expect(Shift.create).toHaveBeenCalledWith(mockShift);
    });
  });

  describe('updateShift', () => {
    it('should update an existing shift', async () => {
      const updatedShift = { ...mockShift, day: 'Tuesday' };
      Shift.findByIdAndUpdate.mockResolvedValue(updatedShift);

      const result = await updateShift('shiftId', updatedShift);

      expect(result).toEqual(updatedShift);
      expect(Shift.findByIdAndUpdate).toHaveBeenCalledWith('shiftId', updatedShift, {
        new: true,
        upsert: true,
        runValidators: true,
      });
    });
  });

});
