import { expect, describe, test, beforeEach, vi } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { afterEach } from "node:test";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      phone: "",
      description: "",
      latitude: -6.2678641,
      longitude: -35.211945,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      phone: null,
      description: null,
      latitude: -6.2678641,
      longitude: -35.211945,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
