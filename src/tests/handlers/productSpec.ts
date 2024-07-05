import supertest from "supertest";
import app from "../../server";
import { AuthenticationHelper } from "../../helper/auth";
import { User } from "../../models/user";
import { Product } from "../../models/product";

const request = supertest(app);

describe("Product Endpoint Test Suite", (): void => {
  let token: string;
  let user: User;
  let product: Product;

  beforeAll(async () => {
    let response = await request.post("/api/users/").send({
      first_name: "Admin",
      last_name: "Jones",
      user_name: "admin",
      password: "password789",
    });

    token = response.body.token as string;
    user = AuthenticationHelper.decodeToken(token) as User;
  });


  // CREATE
  it("create endpoint should add a product: POST /api/products/create", async (): Promise<void> => {
    let response = await request
      .post("/api/products/create")
      .send({
        name: "New Product",
        price: 9999,
        category: "category",
      })
      .set("Authorization", token);

    product = response.body.product as Product;

    expect(response.status).toEqual(200);
    expect(product.id).toBeDefined();
  });

  // INDEX
  it("index endpoint should return a list of products. GET /api/products/", async (): Promise<void> => {
    const response = await request
      .get("/api/products/")
      .set("Authorization", token);

    expect(response.body[0]).toEqual([{
      id: jasmine.any(Number),
      name: "Product Name",
      price: 99,
      category: "category",
    }]);
  });

  // SHOW
  it("show endpoint should return the correct product GET /api/products/:id", async (): Promise<void> => {
    const response = await request
      .get(`/api/products/${product.id}`)
      .set("Authorization", token);

    expect(response.body.name).toEqual("Product Name");
    expect(response.body.price).toEqual(99);
    expect(response.body.category).toEqual("category");
  });

  // Clean up
  afterAll(async () => {
    await request
      .delete("/api/products")
      .send({ id: product.id })
      .set("Authorization", token);

    await request
      .delete("/api/users")
      .send({ id: user.id })
      .set("Authorization", token);
  });
});
