import { User, UserModel } from "../../models/user";

const model = new UserModel();

describe("User Model Test Suite", (): void => {
  const user1: User = {
    first_name: "John",
    last_name: "Doe",
    user_name: "john_doe",
    password: "passwordABC123",
  };

  const user2: User = {
    first_name: "Wade",
    last_name: "Seth",
    user_name: "wade_seth",
    password: "passwordXYZ789",
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
    const createUserResult = await model.create(user1);
    const getCreatedUsers = await model.show(
      createUserResult.id as unknown as number
    );

    expect(createUserResult.user_name).toEqual(user1.user_name);
    expect(createUserResult.first_name).toEqual(user1.first_name);
    expect(createUserResult.id).toBeDefined();
    expect(getCreatedUsers).toEqual(createUserResult);
  });

  // INDEX
  /**
    it("should get all user and update the user first_name", async (): Promise<void> => {
      const getAllUsers = await model.index();
      const { last_name, user_name, password, id } = getAllUsers[0];
  
      expect(user_name).toEqual(user1.user_name);
      expect(editedUserResult.first_name).toEqual("Helen");
    });
  */

  it("index method should get all users", async (): Promise<void> => {
    const getAllUsers = await model.index();

    expect(getAllUsers.length).toBe(1);
    expect(getAllUsers[0].first_name).toEqual(user1.first_name);
    expect(getAllUsers[0].last_name).toEqual(user1.last_name);
    expect(getAllUsers[0].user_name).toEqual(user1.user_name);
  });

  // SHOW
  it("show method should return the correct user", async (): Promise<void> => {
    const user = await model.show(user1.id as unknown as number);

    expect(user.first_name).toEqual(user1.first_name);
    expect(user.last_name).toEqual(user1.last_name);
    expect(user.user_name).toEqual(user1.user_name);
  });

  // DELETE
  it("delete method should remove the user", async (): Promise<void> => {
    const createUserResult = await model.create(user2);
    const deleteUserResult = await model.delete(
      createUserResult.id as unknown as number
    );

    expect(deleteUserResult).toBeGreaterThan(0);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
