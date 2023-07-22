const express = require('express');
const router = express.Router();

// GET /roster - Get all rosters
router.get('/', (req, res) => {
    res.send('All rosters retrieved!');
  });
  
  // POST /roster - Create a new roster
  router.post('/', (req, res) => {
    res.send('Roster created!');
  });
  
  // GET /roster/:id - Get specfic roster
  router.get('/:id', (req, res) => {
    res.send(`Roster ID ${req.params.id} retrieved!`);
  });
  
  // PUT /roster/:id - Update specific roster
  router.put('/:id', (req, res) => {
    res.send(`Roster with ID ${req.params.id} updated!`);
  });
  
  // DELETE /roster/:id - Delete specific roster
  router.delete('/:id', (req, res) => {
    res.send(`Roster with ID ${req.params.id} deleted successfully`);
  });
  
  module.exports = router;
