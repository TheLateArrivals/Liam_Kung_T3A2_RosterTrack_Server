const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (request, response, next) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.sendStatus(401)
  }

  const token = authHeader.split(" ")[1]
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    request.user = await User.findById(data.id).select("-password")
    return next()
  } catch (err) {
    return response.sendStatus(401)
  }
}
module.exports = { auth }
