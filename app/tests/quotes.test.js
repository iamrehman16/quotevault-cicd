import request from "supertest";
import app from "../app.js";
import { resetQuotes } from "../data/quotes.js";

describe("Quote API", () => {
  beforeEach(() => {
    resetQuotes();
  });

  test("GET /health returns healthy message", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Server is healthy" });
  });

  test("GET /getQuote returns a quote", async () => {
    const response = await request(app).get("/getQuote");

    expect(response.status).toBe(200);
    expect(typeof response.body.quote).toBe("string");
    expect(response.body.quote.length).toBeGreaterThan(0);
  });

  test("POST /setQuote stores a new quote", async () => {
    const newQuote = "Simplicity is the ultimate sophistication.";
    const response = await request(app)
      .post("/setQuote")
      .send({ quote: newQuote });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Quote added successfully.",
      quote: newQuote,
    });
  });

  test("POST /setQuote rejects invalid payload", async () => {
    const response = await request(app).post("/setQuote").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "A valid quote string is required.",
    });
  });
});
