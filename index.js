const mongoose = require("mongoose")
const { app, PORT } = require("./server")

app.listen(PORT, () => {
  console.log("Server Found")
  mongoose.set("strictQuery", false)
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Database found")
  })
})