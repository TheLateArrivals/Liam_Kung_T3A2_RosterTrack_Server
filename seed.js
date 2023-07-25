const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config()

const User = require("./models/User")
const Shift = require("./models/Shifts")

// Create a user with a hashed password and store it in the database
async function createUser(username, isAdmin) {
  const hashedPassword = await bcrypt.hash("password", 10) // bcrypt with cost factor 10
  const user = await User.create({ // Create a new user in the database with the provided username, hashed password, and admin status
    username: username,
    password: hashedPassword,
    is_admin: isAdmin,
  })
  return user
}
// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI_TEST, async () => {
  await User.deleteMany({}) // Delete all existing documents from the User collection
  const user = await createUser("user")   // Create a regular user with the username "user"
  await createUser("admin", true) // Create an admin user with the username "admin"
  await Shift.deleteMany({}) // Delete all existing documents from the Shift collection
  const shift = await Shift.create({ // Create a new shift entry in the Shift collection with the provided data
    day: "Monday",
    date: "2023-08-28",
    employee_id: user._id,
    startTime: "08:30",
    endTime: "16:30",
    location: "Littlehampton",
  })
  console.log(shift)

  mongoose.connection.close()
})
