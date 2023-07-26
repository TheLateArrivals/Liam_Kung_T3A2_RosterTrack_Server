const express = require("express")

const {
  registerUser,
  loginUser,
  deleteUser,
  listUserShifts,
} = require("./userControl")
const { auth } = require("../../middleware/auth")
const { admin } = require("../../middleware/admin")

const userRouter = express.Router()

// Create user/staff
userRouter.post("/register", async (request, response) => {
  console.log(request.body);  
  const token = await registerUser({
    email: request.body.email, // Updated to fix validate email issue
    username: request.body.username,
    password: request.body.password,
  })
  if (token.error) {
    return response.status(400).json({ data: token.error })
  }
  return response.status(201).json({
    message: "User registration successful!", // success message 
    token: token, 
  });
});

// User/Staff login
userRouter.post("/login", async (request, response) => {
  const token = await loginUser({
    username: request.body.username,
    password: request.body.password,
  })
  if (token.error) {
    return response.status(401).json({ data: token.error })
  }
  return response.status(201).json({
    message: "User login successful!", // success message 
    token: token, 
  });
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


module.exports = userRouter
