const express = require('express');
const router = express.Router();


// GET /roster - Get all rosters
router.get('/', (req, res) => {
    res.send('All rosters retrieved successfully');
  });
  
  // POST /roster - Create a new roster
  router.post('/', (req, res) => {
    res.send('Roster created successfully');
  });
  
  // GET /roster/:id - Get a specific roster by ID
  router.get('/:id', (req, res) => {
    res.send(`Roster with ID ${req.params.id} retrieved successfully`);
  });
  
  // PUT /roster/:id - Update a specific roster by ID
  router.put('/:id', (req, res) => {
    res.send(`Roster with ID ${req.params.id} updated successfully`);
  });
  
  // DELETE /roster/:id - Delete a specific roster by ID
  router.delete('/:id', (req, res) => {
    res.send(`Roster with ID ${req.params.id} deleted successfully`);
  });
  
  module.exports = router;
