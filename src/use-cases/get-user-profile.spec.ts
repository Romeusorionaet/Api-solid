import { expect, describe, test, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFound } from "./errors/resource-not-found";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  test("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Romeu",
      email: "romeu@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Romeu");
  });

  test("should not be able to get uer profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
