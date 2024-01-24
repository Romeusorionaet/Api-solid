import { test, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Romeu soares de souto",
      email: "romeusoaresdesouto@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
