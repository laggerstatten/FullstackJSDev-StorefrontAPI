import { User, UserModel } from "../../models/user";

const model = new UserModel();
let user1: User;
let user2: User;

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

  it("should have delete method", () => {
    expect(model.delete).toBeDefined();
  });

  // CREATE
  it("create method should add a user", async (): Promise<void> => {
    user1 = await model.create({
      first_name: "First",
      last_name: "Last",
      user_name: "username",
      password: "password123",
    });

    expect(user1.user_name).toEqual("username");
    expect(user1.first_name).toEqual("First");
    expect(user1.id).toBeDefined();

    user2 = await model.create({
      first_name: "John",
      last_name: "Smith",
      user_name: "nameuser",
      password: "password456",
    });
    expect(user2.user_name).toEqual("nameuser");
    expect(user2.first_name).toEqual("John");
    expect(user2.id).toBeDefined();
  });

  // INDEX
  it("index method should return a list of users", async (): Promise<void> => {
    const getAll = await model.index();

    expect(getAll.length).toBe(2);
    expect(getAll[0].first_name).toEqual(user1.first_name);
    expect(getAll[0].last_name).toEqual(user1.last_name);
    expect(getAll[0].user_name).toEqual(user1.user_name);
    expect(getAll[1].first_name).toEqual(user2.first_name);
    expect(getAll[1].last_name).toEqual(user2.last_name);
    expect(getAll[1].user_name).toEqual(user2.user_name);
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
    await model.delete(user1.id as unknown as number);
    const result = await model.index();

    expect(result.length).toBe(1);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
