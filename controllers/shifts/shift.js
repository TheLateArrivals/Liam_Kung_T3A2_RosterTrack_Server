const express = require("express");

const {
  findShifts,
  getShifts,
  createShift,
  updateShift,
} = require("./shiftControl");

const { auth } = require("../../middleware/auth");

const shiftRouter = express.Router();

// Get shifts
shiftRouter.get("/", async (request, response) => {
  try {
    const shifts = await findShifts({});
    response.json(shifts);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

// Get specific shift
shiftRouter.get("/:shiftId", async (request, response) => {
  try {
    const shiftId = request.params.shiftId;
    const shift = await getShifts(shiftId);
    if (!shift) {
      return response.status(404).json({ error: "Shift not found" });
    }
    response.json(shift);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

// Create new shift
shiftRouter.post("/", async (request, response) => {
  try {
    const shift = await createShift({
      day: request.body.date,
      date: request.body.date,
      employee_id: request.body.employee_id,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
      location: request.body.location,
    });
    response.json(shift);
  } catch (error) {
    response.status(400).json({ error: "Bad request" });
  }
});

// Update shift
shiftRouter.put("/:shiftId", auth, async (request, response) => {
  try {
    const updatedShift = await updateShift(request.params.shiftId, {
      day: request.body.date,
      date: request.body.date,
      employee_id: request.body.employee_id,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
      location: request.body.location,
    });
    response.json(updatedShift);
  } catch (error) {
    response.status(404).json({ error: "Shift not found" });
  }
});

module.exports = shiftRouter;
