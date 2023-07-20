const request = require("supertest");
const { app } = require("../server");

describe("server route", () => {
  it("display hello world", async () => {
    const response = await request(app).get("/");
    // assertion
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual("Hello, world!");
  });

  it("returns not found", async () => {
    const response = await request(app).get("/does-not-exist");
    // assertion
    expect(response.statusCode).toBe(404);
  });

  it("should register a new user", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body.accessToken).toBeTruthy();
  });

  it("should return a 409 status if user already exists", async () => {
    const userData = {
      username: "existinguser",
      email: "existinguser@example.com",
      password: "testpassword",
    };

    // Register the user first
    await request(app)
      .post("/user/register")
      .send(userData);

    // Attempt to register the same user again
    const response = await request(app)
      .post("/user/register")
      .send(userData);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });


});
