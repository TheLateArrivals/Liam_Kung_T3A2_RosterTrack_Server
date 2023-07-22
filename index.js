const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const { app } = require("./server");
const PORT = 8080;

// Generate a random 32-byte (256-bit) JWT secret as a string
const jwtSecret = crypto.randomBytes(32).toString('hex');

async function startServer() {
  try {
    // Connect to the MongoDB database using async/await
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other options if needed...
    });

    console.log("Database connected");

    // Example of a route that generates a JWT token and verifies it
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

    // Start the Express server after the database connection is established
    app.listen(PORT, () => {
      console.log("Server Started");
      mongoose.set("strictQuery", false);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
