// Import required module for the application
const mongoose = require("mongoose");

// Define a Mongoose schema for the Shift collection in MongoDB
const ShiftSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true, // The "day" field is required for every shift document
  },
  date: {
    type: Date,
    required: true, // The "date" field is required for every shift document
  },
  employee_id: {
    type: String,
    required: true, // The "employee_id" field is required for every shift document
  },
  startTime: {
    type: Date,
    required: true, // The "startTime" field is required for every shift document
  },
  endTime: {
    type: Date,
    required: true, // The "endTime" field is required for every shift document
  },
  location: {
    type: String,
    required: true, // The "location" field is required for every shift document
  },
});

// Create a Mongoose model named 'Shift' based on the defined schema
const Shift = mongoose.model("Shift", ShiftSchema);

// Export the Shift model to be used in other modules
module.exports = Shift;
