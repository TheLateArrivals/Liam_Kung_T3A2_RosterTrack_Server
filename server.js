const express = require("express")
const cors = require("cors")
const helmet = require("helmet") // Helmet middleware for securing the application
require("dotenv").config() // Loads environment variables from a .env file

const userRouter = require("./controllers/user/user") // Router for user-related routes
const shiftRouter = require("./controllers/shifts/shift") // Router for shift-related routes
const rosterRouter = require("./controllers/rosters/roster")

const app = express()
// Enhance security by adding Helmet middleware
app.use(helmet())
// Configure CORS options
const cors = require('cors');
const corsOption = {
  origin: "*",  
  optionsSuccessStatus: 200,
};
// Enable CORS with the specified options
app.use(cors(corsOption));

// Enable pre-flight request for all routes
app.options('*', cors(corsOption));

app.use(express.json()); //for parsing json data

const PORT = process.env.PORT || 443 // port number to listen on
// route to check if the server is running
app.get("/", (request, response) => {
  response.json({
    data: "Hello World",
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
