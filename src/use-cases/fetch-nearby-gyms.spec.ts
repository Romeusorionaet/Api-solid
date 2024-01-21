import { expect, describe, test, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  test("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      phone: null,
      description: null,
      latitude: -6.2678641,
      longitude: -35.211945,
    });

    await gymsRepository.create({
      title: "Far Gym",
      phone: null,
      description: null,
      latitude: -6.3816028,
      longitude: -35.1319371,
    });

    const { gyms } = await sut.execute({
      userLatitude: -6.2678641,
      userLongitude: -35.211945,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });

  //   test("should be able to fetch paginated gym search", async () => {
  //     for (let i = 1; i <= 22; i++) {
  //       await gymsRepository.create({
  //         title: `JavaScript Gym ${i}`,
  //         phone: null,
  //         description: null,
  //         latitude: -6.2678641,
  //         longitude: -35.211945,
  //       });
  //     }

  //     const { gyms } = await sut.execute({
  //       query: "JavaScript",
  //       page: 2,
  //     });

  //     expect(gyms).toHaveLength(2);
  //     expect(gyms).toEqual([
  //       expect.objectContaining({ title: "JavaScript Gym 21" }),
  //       expect.objectContaining({ title: "JavaScript Gym 22" }),
  //     ]);
  //   });
});
