import { expect, describe, test, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { randomUUID } from "node:crypto";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  test("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: "user-id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
