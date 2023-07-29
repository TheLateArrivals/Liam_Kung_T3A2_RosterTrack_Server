const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../../models/User")
const Shift = require("../shifts/shift")


// Register new user
async function registerUser(user) {
  const existingUser = await User.findOne({ username: user.username })
  if (existingUser) {
    return { error: "Username already exists! Please try again" }
  }
  if (user.password == null || user.password.length < 5) {
    return { error: "Your password must be more than 5 characters!" }
  }
  // Create a hash password for the user
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const userCreated = await User.create({
    email: user.email, // Updated to fix validate email issue
    username: user.username,
    password: hashedPassword,
  })
  const payload = {
    id: userCreated._id,
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token
}

// Login user
async function loginUser(user) {
  console.log("Attempting to log in user:", user);

  const existingUser = await User.findOne({ username: user.username });
  console.log("Found user:", existingUser);

  if (!existingUser) {
    console.log("User not found");
    return { error: "Incorrect username or password" };
  } 

  // Match the password
  const isMatch = await bcrypt.compare(user.password, existingUser.password);
  console.log("Password match result:", isMatch);

  if (!isMatch) {
    console.log("Password does not match");
    return { error: "Incorrect username or password" };
  }

  // Create the token 
  const payload = { id: existingUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  console.log("Generated token:", token);
  return token;
}


// Delete a user
async function deleteUser(userId) {
  const deletedUser = await User.findByIdAndDelete(userId)
  return deletedUser
}

async function aggregateShifts(filter) {
  const shifts = await Shift.aggregate()
    .match(filter)
    .addFields({
      shiftId: { $convert: { input: "$shift_id", to: "objectId", onError: "", onNull: "" } },
    })
    .lookup({
      from: "shifts",
      localField: "shiftId",
      foreignField: "_id",
      as: "shift",
    })
    .unwind("shift")
  return shifts
}

async function listUserShifts(userId) {
  return aggregateShifts({ shift_id: userId })
}


module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  listUserShifts,
}
