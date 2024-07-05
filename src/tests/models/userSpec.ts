import { User, UserModel } from "../../models/user";

const model = new UserModel();
let user1: User;

describe("User Model Test Suite", (): void => {
  beforeAll(async () => {

    await model.deleteAll();

  });

  const user1: User = {
    first_name: "First",
    last_name: "Last",
    user_name: "username",
    password: "password123",
  };

  const user2: User = {
    first_name: "John",
    last_name: "Smith",
    user_name: "nameuser",
    password: "password456",
  };

  it("should have an index method", () => {
    expect(model.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(model.create).toBeDefined();
  });

  it("should have a show method", () => {
    expect(model.show).toBeDefined();
  });

  it("should have delete method", () => {
    expect(model.delete).toBeDefined();
  });

  // CREATE
  it("create method should add a user", async (): Promise<void> => {
    const result = await model.create(user1);

    expect(result).toEqual({
      id: jasmine.any(Number),
      first_name: "First",
      last_name: "Last",
      user_name: "username",
      password: "password123",
    });

    expect(result.id).toBeDefined();
  });

  // INDEX
  it("index method should return a list of users", async () => {
    const result = await model.index();

    expect(result).toEqual([{
      id: jasmine.any(Number),
      first_name: "First",
      last_name: "Last",
      user_name: "username",
      password: "password123",
    }]);
  });

  // SHOW
  it("show method should return the correct user", async () => {
    const createResult = await model.create(user1);
    const showResult = await model.show(
      createResult.id as unknown as number
    );

    expect(showResult).toEqual(createResult);
  });

  // DELETE
  it("delete method should remove the user", async () => {
    const createResult = await model.create(user2);
    const deleteResult = await model.delete(
      createResult.id as unknown as number
    );

    expect(deleteResult).toBeGreaterThan(0);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
