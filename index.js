const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const { app } = require("./server");
const PORT = 8080;

// Generate JWT secret as a string
const jwtSecret = crypto.randomBytes(32).toString('hex');
// start the server and establish the database connection
async function startServer() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new Server Discovery and Monitoring engine
    });

    console.log("Database connected");

    // Example of a route that generates a JWT
    app.get('/example', (req, res) => {
      // Generate a JWT token
      const payload = { userId: 'someUserId' };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      // Verify the token
      try {
        const decoded = jwt.verify(token, jwtSecret);
        console.log(decoded); // { userId: 'someUserId', iat: 1630341945, exp: 1630345545 }
        res.json({ token });
      } catch (err) {
        console.error('Invalid token');
        res.status(401).json({ error: 'Invalid token' });
      }
    });

    // Start the Express server 
    app.listen(PORT, () => {
      console.log("Server Started");
      mongoose.set("strictQuery", false);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
