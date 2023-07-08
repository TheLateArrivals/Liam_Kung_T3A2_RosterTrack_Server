const express = require('express');
const router = express.Router();


// GET /shift - Get all shifts
router.get('/', (req, res) => {
    res.send('All shifts retrieved successfully');
  });
  
  // POST /shift - Create a new shift
  router.post('/', (req, res) => {
    res.send('Shift created successfully');
  });
  
  // GET /shift/:id - Get a specific shift by ID
  router.get('/:id', (req, res) => {
    res.send(`Shift with ID ${req.params.id} retrieved successfully`);
  });
  
  // PUT /shift/:id - Update a specific shift by ID
  router.put('/:id', (req, res) => {
    res.send(`Shift with ID ${req.params.id} updated successfully`);
  });
  
  // DELETE /shift/:id - Delete a specific shift by ID
  router.delete('/:id', (req, res) => {
    res.send(`Shift with ID ${req.params.id} deleted successfully`);
  });
  

  module.exports = router;