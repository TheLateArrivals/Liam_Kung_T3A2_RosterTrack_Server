const Shift = require("../../models/Shifts")

// Find all shifts
async function findShifts(filter) {
  const shifts = await Shift.find(filter)
  return shifts
}

// Find a specific shift
async function getShifts(id) {
  const shift = await Shift.findById(id)
  return shift
}

// Create a new shift
async function createShift(newShift) {
  const creadtedShift = await Shift.create(newShift)
  return creadtedShift;
}

// Update a Shift
async function updateShift(shiftId, shift) {
  const updatedShift = await Shift.findByIdAndUpdate(shiftId, shift, {
    new: true,
    upsert: true,
    runValidators: true,
  })
  return updatedShift
}


module.exports = {
  findShifts,
  getShifts,
  createShift,
  updateShift,
}
