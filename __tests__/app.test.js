const request = require("supertest");
const app = require("../app");

describe.only("GET: /api/topics", () => {
  it("200: Responds with an object with the key of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(body).toHaveProperty("topics");
      });
  });
  it("200: responds with an object with the value of an array of topic objects", () => {});
});
