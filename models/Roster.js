const mongoose = require('mongoose');

const rosterSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  shift: { type: mongoose.Schema.Types.ObjectId, ref: 'Shifts', required: true },
});

const Roster = mongoose.model('Roster', rosterSchema);

module.exports = Roster;
