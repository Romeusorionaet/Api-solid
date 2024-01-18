import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  test("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2024, 0, 21, 0, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
