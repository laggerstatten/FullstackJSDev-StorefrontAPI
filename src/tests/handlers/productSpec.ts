import supertest from "supertest";
import app from "../../server";
import { AuthenticationHelper } from "../../helper/auth";
import { User } from "../../models/user";
import { Product } from "../../models/product";

const request = supertest(app);

describe("Product Endpoint Test Suite", (): void => {
  let token: string;
  let user: User;
  let product1: Product;
  let product2: Product;

  beforeAll(async () => {
    const response = await request.post("/api/users/").send({
      first_name: "Admin",
      last_name: "Jones",
      user_name: "admin",
      password: "password789",
    });

    token = response.body.token as string;
    user = AuthenticationHelper.decodeToken(token) as User;
  });


  // CREATE
  it("create endpoint should add a product: POST /api/products/", async (): Promise<void> => {
    let response = await request
      .post("/api/products/")
      .send({
        name: "New Product",
        price: 9999,
        category: "category",
      })
      .set("Authorization", token);

    product1 = response.body.product as Product;

    expect(response.status).toEqual(200);
    expect(product1.id).toBeDefined();
    expect(product1.name).toEqual("New Product");
    expect(product1.price).toEqual(9999);
    expect(product1.category).toEqual("category");

    response = await request
      .post("/api/products/")
      .send({
        name: "New Product 2",
        price: 999,
        category: "cat",
      })
      .set("Authorization", token);

    product2 = response.body.product as Product;

    expect(response.status).toEqual(200);
    expect(product1.id).toBeDefined();
    expect(product2.name).toEqual("New Product 2");
    expect(product2.price).toEqual(999);
    expect(product2.category).toEqual("cat");
  });

  // SHOW
  it("show endpoint should return the correct product. GET /api/products/:id", async (): Promise<void> => {
    const response = await request
      .get(`/api/products/${product1.id}`)
      .set("Authorization", token);

    expect(response.body.name).toEqual("New Product");
    expect(response.body.price).toEqual(9999);
    expect(response.body.category).toEqual("category");
  });

  // INDEX
  it("index endpoint should return a list of products. GET /api/products/", async (): Promise<void> => {
    const response = await request
      .get("/api/products/")
      .set("Authorization", token);

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("New Product");
    expect(response.body[0].price).toEqual(9999);
    expect(response.body[0].category).toEqual("category");
    expect(response.body[1].name).toEqual("New Product 2");
    expect(response.body[1].price).toEqual(999);
    expect(response.body[1].category).toEqual("cat");
  });

  /**
    it("should update a product. PUT /api/products/:id", async (): Promise<void> => {
      const response = await request
        .put(`/api/products/${product2.id}`)
        .set("Authorization", token)
        .send({
          name: "Johnson Baby oil",
          price: 52,
          category: "toiletries",
        });
  
      expect(response.body.name).toEqual("Johnson Baby oil");
      expect(response.body.price).toEqual(52);
      expect(response.body.category).toEqual("toiletries");
    });
  */

  // Clean up
  afterAll(async () => {
    await request
      .delete("/api/products/")
      .send({ id: product1.id })
      .set("Authorization", token);

    await request
      .delete("/api/products/")
      .send({ id: product2.id })
      .set("Authorization", token);

    await request
      .delete("/api/users/")
      .send({ id: user.id })
      .set("Authorization", token);
  });
});
