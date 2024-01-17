import { expect, describe, test, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-errors";
import { AuthenticateUseCase } from "./authenticate";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  test("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Romeu",
      email: "romeu@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "romeu@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "romeu@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Romeu",
      email: "romeu@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "romeu@gmail.com",
        password: "893786",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
