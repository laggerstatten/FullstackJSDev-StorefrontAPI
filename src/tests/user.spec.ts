import { User, UserModel } from "../models/user";

const model = new UserModel();

let user1: User;

// test suite
describe("User Model Test Suite", (): void => {
  // methods
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
      first_name: "User",
      last_name: "Name",
      user_name: "username",
      password: "password123",
    });

    expect(user1.first_name).toEqual("User");
    expect(user1.last_name).toEqual("Name");
    expect(user1.user_name).toEqual("username");
    expect(user1.password).toEqual("password123");
    expect(user1.id).toBeDefined();
  });


  // QUERY ID


  // DELETE
  it("should delete the user", async (): Promise<void> => {
    await model.delete(user1.id as unknown as number);
    const result = await model.index();

    expect(result.length).toBe(0);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
