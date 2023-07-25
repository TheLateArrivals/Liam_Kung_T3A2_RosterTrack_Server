// Import required module for the application
const request = require("supertest"); // Library for testing HTTP requests
const { app } = require("../server"); // Import the Express application from the "server.js" file

// Describe a test suite for the server route
describe("server route", () => {
  // Test case for checking if the root route ("/") displays the expected message
  it("shows message", async () => {
    // Send an HTTP GET request to the root route ("/")
    const response = await request(app).get("/");

    // Assertions to check the response from the server
    expect(response.statusCode).toBe(200); // Check if the response status code is 200 (OK)
    expect(response.text).toEqual(expect.stringContaining("Hello World")); // Check if the response contains the expected message "Hello World"
  });

  // Test case for checking if a route that does not exist returns a 404 Not Found status
  it("not found", async () => {
    // Send an HTTP GET request to a route that does not exist ("/does-not-exist")
    const response = await request(app).get("/does-not-exist");

    // Assertion to check the response from the server
    expect(response.statusCode).toBe(404); // Check if the response status code is 404 (Not Found)
  });
});

