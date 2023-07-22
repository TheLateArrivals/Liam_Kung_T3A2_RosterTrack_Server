const mongoose = require("mongoose")

const ShiftSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  employee_id: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
})

const Shift = mongoose.model("Shift", ShiftSchema)

module.exports = Shift
