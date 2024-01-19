import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-6.2678641),
      longitude: new Decimal(-35.211945),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -6.2678641,
      userLongitude: -35.211945,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -6.2678641,
      userLongitude: -35.211945,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -6.2678641,
        userLongitude: -35.211945,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  test("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -6.2678641,
      userLongitude: -35.211945,
    });

    vi.setSystemTime(new Date(2024, 0, 21, 0, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -6.2678641,
      userLongitude: -35.211945,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Javascript-Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-6.3816028),
      longitude: new Decimal(-35.1319371),
    });

    await expect(() => {
      return sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -6.2678641,
        userLongitude: -35.211945,
      });
    }).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
