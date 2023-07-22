const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config()

const User = require("./models/User")
const Shift = require("./models/Shifts")


async function createUser(username, isAdmin) {
  const hashedPassword = await bcrypt.hash("password", 10)
  const user = await User.create({
    username: username,
    password: hashedPassword,
    is_admin: isAdmin,
  })
  return user
}

mongoose.connect(process.env.MONGO_URI_TEST, async () => {
  await User.deleteMany({})
  const user = await createUser("user")
  await createUser("admin", true)
  await Shift.deleteMany({})
  const shift = await Shift.create({
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
