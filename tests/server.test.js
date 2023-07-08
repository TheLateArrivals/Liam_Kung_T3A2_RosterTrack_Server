const request = require("supertest")
const { app } = require("../server")

//1.
describe("server route", () => {
    it("display hello world", async () => {
      const response = await request(app).get("/")
      //assertion
      expect(response.statusCode).toBe(200)
      expect(response.text).toEqual("Hello, world!")
    })
  
    it("returns not found", async () => {
      const response = await request(app).get("/does-not-exist")
      //assertion
      expect(response.statusCode).toBe(404)
    })
  })