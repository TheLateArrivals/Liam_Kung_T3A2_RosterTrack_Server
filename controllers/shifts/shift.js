const express = require("express")

const {
  findShifts,
  getShifts,
  createShift,
  updateShift,
} = require("./shiftControl")

const { auth } = require("../../middleware/auth")

const shiftRouter = express.Router()

// Get shifts
shiftRouter.get("/", async (request, response) => {
  const shifts = await findShifts({    
  })
  return response.json(shifts)
})

// Get specific shift
shiftRouter.get("/:shiftId", async (request, response) => {
  try {
    const shiftId = request.params.shiftIdId
    const shift = await getShifts(shiftId)
    return response.json(shift)
  } catch (error) {
    response.sendStatus(404)
  }
})

// Create new shift
shiftRouter.post("/", auth, async (request, response) => {
  try {
    const shift = await createShift({
      day: request.body.date,
      date: request.body.date,
      employee_id: request.body.employee_id,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
      location: request.body.location,
    })
    return response.json(shift)
  } catch (error) {
    return response.status(400).json({ data: error })
  }
})

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
    })
    return response.json(updatedShift)
  } catch (error) {
    return response.sendStatus(404)
  }
})

module.exports = shiftRouter
