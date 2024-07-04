import { User, UserModel } from "../../models/user";

const model = new UserModel();
let user1: User;

describe("User Model Test Suite", (): void => {
  beforeAll(async () => {

    await model.deleteAll();

  });

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
    const result = await model.create({
      first_name: "First",
      last_name: "Last",
      user_name: "username",
      password: "password123",
    });

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
    const result = await model.show(1);

    expect(result).toEqual({
      id: 1,
      first_name: "First",
      last_name: "Last",
      user_name: "username",
      password: "password123",
    });
  });


  // DELETE
  it("delete method should remove the user", async () => {
    await model.delete(0);
    const result = await model.index();

    expect(result).toEqual([]);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
