import supertest from "supertest";
import app from "../../server";
import { AuthenticationHelper } from "../../helper/auth";
import { User } from "../../models/user";
import { Product } from "../../models/product";

const request = supertest(app);

describe("Product Endpoint Test Suite", (): void => {
  let token: string;
  let admin: User;
  let product1: Product;
  let product2: Product;

  beforeAll(async () => {
    const response = await request
      .post("/api/users/")
      .send({
        first_name: "Admin",
        last_name: "Jones",
        user_name: "admin",
        password: "password789",
      });

    token = response.body.token as string;
    admin = AuthenticationHelper.decodeToken(token) as User;
  });


  // CREATE
  it("create endpoint should add a product: POST /api/products/", async (): Promise<void> => {
    let response = await request
      .post("/api/products/")
      .send({
        name: "Wood Chipper",
        price: 9999,
        category: "timber",
      })
      .set("Authorization", token);

    product1 = response.body.product as Product;

    expect(response.status).toEqual(200);
    expect(product1.id).toBeDefined();
    expect(product1.name).toEqual("Wood Chipper");
    expect(product1.price).toEqual(9999);
    expect(product1.category).toEqual("timber");

    response = await request
      .post("/api/products/")
      .send({
        name: "Orchard Sprayer",
        price: 999,
        category: "fruit",
      })
      .set("Authorization", token);

    product2 = response.body.product as Product;

    expect(response.status).toEqual(200);
    expect(product1.id).toBeDefined();
    expect(product2.name).toEqual("Orchard Sprayer");
    expect(product2.price).toEqual(999);
    expect(product2.category).toEqual("fruit");
  });

  // SHOW
  it("show endpoint should return the correct product. GET /api/products/:id", async (): Promise<void> => {
    const response = await request
      .get(`/api/products/${product1.id}`)
      .set("Authorization", token);

    expect(response.body.name).toEqual("Wood Chipper");
    expect(response.body.price).toEqual(9999);
    expect(response.body.category).toEqual("timber");
  });

  // INDEX
  it("index endpoint should return a list of products. GET /api/products/", async (): Promise<void> => {
    const response = await request
      .get("/api/products/")
      .set("Authorization", token);

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("Wood Chipper");
    expect(response.body[0].price).toEqual(9999);
    expect(response.body[0].category).toEqual("timber");
    expect(response.body[1].name).toEqual("Orchard Sprayer");
    expect(response.body[1].price).toEqual(999);
    expect(response.body[1].category).toEqual("fruit");
  });

  // DELETE
  it("delete endpoint should remove the products", async (): Promise<void> => {
    let response = await request
      .delete(`/api/products/${product1.id}`)
      .set("Authorization", token);
    expect(response.status).toEqual(200);

    response = await request
      .delete(`/api/products/${product2.id}`)
      .set("Authorization", token);
    expect(response.status).toEqual(200);
  });

  // Clean up
  afterAll(async () => {
    await request
      .delete(`/api/users/${admin.id}`)
      .set("Authorization", token);
  });
});
