import { User, UserModel } from "../../models/user";

const model = new UserModel();
let user1: User;

describe("User Model Test Suite", (): void => {
  it("should have an index method", () => {
    expect(model.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(model.create).toBeDefined();
  });

  it("should have a show method", () => {
    expect(model.show).toBeDefined();
  });

  it("should have update method", () => {
    expect(model.update).toBeDefined();
  });

  it("should have delete method", () => {
    expect(model.delete).toBeDefined();
  });

  // CREATE
  it("should create a user", async (): Promise<void> => {
    user1 = await model.create({
      first_name: "John",
      last_name: "Doe",
      user_name: "john_doe",
      password: "passwordABC123",
    });
    expect(user1.user_name).toEqual("john_doe");
    expect(user1.first_name).toEqual("John");
    expect(user1.id).toBeDefined();
  });

  // GET ALL
  // GET BY ID
  // UPDATE

  // DELETE

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
