const express = require("express")
const cors = require("cors")
const helmet = require("helmet") // Helmet middleware for securing the application
require("dotenv").config() // Loads environment variables from a .env file

const userRouter = require("./controllers/user/user") // Router for user-related routes
const shiftRouter = require("./controllers/shifts/shift") / Router for shift-related routes

const app = express()
// Enhance security by adding Helmet middleware
app.use(helmet())
// Configure CORS options
const corsOption = {
  // Frontend
  origin: [
    "http://localhost:3000", // Allowed origins
  ],
  credentials: true, // Allow sending and receiving cookies in cross-origin requests
  optionsSuccessStatus: 200, //status code to be sent for successful CORS preflight requests
}
// Enable CORS with the specified options
app.use(cors(corsOption))

app.use(express.json()); //for parsing json data

const PORT = process.env.PORT || 8080 // port number to listen on
// route to check if the server is running
app.get("/", (request, response) => {
  response.json({
    data: "Hello World",
  })
})
// handle routes
app.use("/users", userRouter)
app.use("/shifts", shiftRouter)

module.exports = {
  app,
  PORT,
}
