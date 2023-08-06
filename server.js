const cors = require("cors")
const express = require("express")
const helmet = require("helmet") // Helmet middleware for securing the application
require("dotenv").config() // Loads environment variables from a .env file

const userRouter = require("./controllers/user/user") // Router for user-related routes
const shiftRouter = require("./controllers/shifts/shift") // Router for shift-related routes
const rosterRouter = require("./controllers/rosters/roster")

const app = express()
// Enhance security by adding Helmet middleware
app.use(helmet())
// Configure CORS options
const corsOption = {
  origin: [process.env.REACT_APP_FRONT_PROD_URL, process.env.REACT_APP_FRONT_DEV_URL],
  credentials: true, // Allow credentials to be sent with requests
  optionsSuccessStatus: 200,
};
// Enable CORS with the specified options
app.use(cors(corsOption));

// Enable pre-flight request for all routes
app.options('*', cors(corsOption));

app.use(express.json()); //for parsing json data

const PORT = process.env.PORT || 80 // port number to listen on
// route to check if the server is running
app.get("/", (request, response) => {
  response.json({
    message: "Hello World",
  })
})
// handle routes
app.use("/users", userRouter)
app.use("/shifts", shiftRouter)
app.use("/roster", rosterRouter)

module.exports = {
  app,
  PORT,
}
