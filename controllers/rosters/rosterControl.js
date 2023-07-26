const Roster = require('../../models/Roster');


const getAllRosters = (req, res) => {
  
  Roster.find()
    .populate('user') 
    .populate('shift') // 
    .exec((err, rosters) => {
      if (err) {
        res.status(500).json({ error: 'Failed to retrieve rosters' });
      } else {
        res.status(200).json(rosters);
      }
    });
};

// POST /roster - Create a new roster
const createRoster = (req, res) => {

  const newRoster = new Roster({
    month: req.body.month,
    year: req.body.year,
    user: req.body.userId, 
    shift: req.body.shiftId, 
  });

  newRoster.save((err, roster) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create roster' });
    } else {
      res.status(201).json(roster);
    }
  });
};


module.exports = {
  getAllRosters,
  createRoster,
  
};
