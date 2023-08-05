const express = require("express");
const { registerUser, loginUser, deleteUser, listUserShifts } = require("./userControl");
const { auth } = require("../../middleware/auth");
const { admin } = require("../../middleware/admin");
const userRouter = express.Router();
const Staff = require("../../models/Staff"); 

// Create user/staff
userRouter.post("/register", async (request, response) => {  
  const token = await registerUser({
    email: request.body.email,
    username: request.body.username,
    password: request.body.password,
  })
  if (token.error) {
    return response.status(400).json({ data: token.error })
  }
  return response.status(201).json({
    message: "User registration successful!",
    token: token,
  });
});

// User/Staff login
userRouter.post("/login", async (request, response) => {
  console.log("Login endpoint hit"); // Logs when the endpoint is hit
  console.log("Request Body:", request.body); // Logs the request body
  const token = await loginUser({
    username: request.body.username,
    password: request.body.password,
  })
  if (token.error) {
    return response.status(401).json({ error: token.error })
  }
  return response.status(201).json({
    message: "User login successful!",
    token: token,
  });
  console.log("Response:", { message: "User login successful!", token: token }); // Logs the response
});

// Delete staff/user
userRouter.delete("/:userId", auth, admin, async (request, response) => {
  try {
    const user = await deleteUser(request.params.userId)
    return response.json(user)
  } catch (error) {
    return response.sendStatus(404)
  }
})

// User/staff details
userRouter.get("/profile", auth, async (request, response) => {
  return response.json(request.user)
})

// Show staff/user shifts
userRouter.get("/:userId/shifts", auth, async (request, response) => {
  const shifts = await listUserShifts(request.params.userId)
  return response.json(shifts)
})

// This endpoint allows you to add a staff member
userRouter.post('/staff', auth, admin, async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const staff= new Staff({ firstName, lastName, email });

  try {
    await staff.save();
    res.send(staff);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = userRouter