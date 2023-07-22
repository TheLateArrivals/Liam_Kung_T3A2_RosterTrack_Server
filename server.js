const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
require("dotenv").config()

const userRouter = require("./controllers/user/user")
const shiftRouter = require("./controllers/shifts/shift")

const app = express()

app.use(helmet())

const corsOption = {
  // the origin that we want to accept, i.e. our frontend
  origin: [
    "http://localhost:3000",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOption))

app.use(express.json()); //for parsing json data

const PORT = process.env.PORT || 8080

app.get("/", (request, response) => {
  response.json({
    data: "Hello World",
  })
})

app.use("/users", userRouter)
app.use("/shifts", shiftRouter)

module.exports = {
  app,
  PORT,
}