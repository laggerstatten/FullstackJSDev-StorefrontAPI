import supertest from "supertest";
import app from "../../server";
import { AuthenticationHelper } from "../../helper/auth";
import { User } from "../../models/user";

const request = supertest(app);

describe("User Endpoint Test Suite", (): void => {
  let token: string;
  let user: User;

  // CREATE
  it("create endpoint should add a user: POST /api/users/", async (): Promise<void> => {
    const response = await request.post("/api/users/").send({
      first_name: "Aisha",
      last_name: "William",
      user_name: "aisha_blogs",
      password: "enjoyEveryDay",
    });

    token = response.body.token as string;
    user = AuthenticationHelper.decodeToken(token);

    expect(response.status).toEqual(200);
    expect(user.id).toBeDefined();
  });

  // INDEX
  it("index endpoint should return a list of users. GET /api/users/:id", async (): Promise<void> => {
    const response = await request
      .get("/api/users/")
      .get(`/api/users/${user.id}`)
      .set("Authorization", token);

    expect(response.body.first_name).toEqual("Aisha");
    expect(response.body.last_name).toEqual("William");
    expect(response.body.user_name).toEqual("aisha_blogs");
  });

  // SHOW
  it("show endpoint should return the correct user. GET /api/users/", async (): Promise<void> => {
    const response = await request
      .get("/api/users/")
      .set("Authorization", token);

    expect(response.body[0].first_name).toEqual("Aisha");
    expect(response.body[0].last_name).toEqual("William");
    expect(response.body[0].user_name).toEqual("aisha_blogs");
  });

  // Clean up
  afterAll(async () => {
    await request
      .delete("/api/users")
      .send({ id: user.id })
      .set("Authorization", token);
  });
});
