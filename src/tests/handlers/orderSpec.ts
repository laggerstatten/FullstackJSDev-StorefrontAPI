import supertest from "supertest";
import app from "../../server";
import { AuthenticationHelper } from "../../helper/auth";
import { User } from "../../models/user";
import { Product } from "../../models/product";
import { Order } from "../../models/order";

const request = supertest(app);

describe("Order Endpoint Test Suite", (): void => {
  let token: string;
  let user: User;
  let product: Product;
  let order: Order;

  beforeAll(async () => {
    let response = await request.post("/api/users/").send({
      first_name: "Admin",
      last_name: "Jones",
      user_name: "admin",
      password: "password789",
    });

    token = response.body.token as string;
    user = AuthenticationHelper.decodeToken(token) as User;

    response = await request
      .post("/api/products/create")
      .send({
        name: "New Product",
        price: 9999,
        category: "category",
      })
      .set("Authorization", token);

    product = response.body.product as Product;


  });

  // CREATE
  it("create endpoint should add a orders: POST /api/orders/create/user_id", async (): Promise<void> => {
    let response = await request
      .post(`/api/orders/create/${user.id}`)
      .send({
        status: "active",
        products: [
          {
            product_id: product.id,
            quantity: 2,
          },
        ],
      })
      .set("Authorization", token);

    order = response.body.order as Order;

    expect(order.id).toBeDefined();
  });

  // INDEX
  it("index endpoint should return a list of orders. GET /api/orders/", async (): Promise<void> => {
    const response = await request
      .get("/api/orders/")
      .set("Authorization", token);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].status).toEqual("active");
  });

  // SHOW
  it("show endpoint should return the correct order GET /api/orders/:id", async (): Promise<void> => {
    const response = await request
      .get(`/api/orders/${order.id}`)
      .set("Authorization", token);

    expect(response.body.status).toEqual("active");
    expect(Number(response.body.user_id)).toEqual(user.id as unknown as number);
  });

  // Clean up
  afterAll(async (): Promise<void> => {
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
