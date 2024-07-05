import supertest from "supertest";
import app from "../../server";
import { AuthenticationHelper } from "../../helper/auth";
import { User } from "../../models/user";
import { Product } from "../../models/product";
import { Order } from "../../models/order";

const request = supertest(app);

describe("Order Endpoint Test Suite", (): void => {
  let token: string;
  let admin: User;
  let product1: Product;
  let product2: Product;
  let order1: Order;
  let order2: Order;

  beforeAll(async () => {
    let response = await request
      .post("/api/users/")
      .send({
        first_name: "Admin",
        last_name: "Jones",
        user_name: "admin",
        password: "password789",
      });

    token = response.body.token as string;
    admin = AuthenticationHelper.decodeToken(token) as User;

    response = await request
      .post("/api/products/")
      .send({
        name: "Wood Chipper",
        price: 9999,
        category: "timber",
      })
      .set("Authorization", token);

    product1 = response.body.product as Product;

    response = await request
      .post("/api/products/")
      .send({
        name: "Orchard Sprayer",
        price: 999,
        category: "fruit",
      })
      .set("Authorization", token);

    product2 = response.body.product as Product;
  });

  // CREATE
  it("create endpoint should add an order: POST /api/orders/user_id", async (): Promise<void> => {
    let response = await request
      .post(`/api/orders/${admin.id}`)
      .send({
        status: "active",
        products: [
          {
            product_id: product1.id,
            quantity: 2,
          },
          {
            product_id: product2.id,
            quantity: 3,
          },
        ],
      })
      .set("Authorization", token);

    order1 = response.body.order as Order;

    response = await request
      .post(`/api/orders/${admin.id}`)
      .send({
        status: "completed",
        products: [
          {
            product_id: product2.id,
            quantity: 5,
          },
        ],
      })
      .set("Authorization", token);

    order2 = response.body.order as Order;
  });

  // GET ORDER BY USER ID
  it("getOrdersByUserID method should get order based on userID. GET /api/orders/getOrdersByUserID/:id", async (): Promise<void> => {
    const response = await request
      .get(`/api/orders/getOrdersByUserID/${admin.id}`)
      .set("Authorization", token);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  // SHOW
  it("show endpoint should return the correct order. GET /api/orders/:id", async (): Promise<void> => {
    const response = await request
      .get(`/api/orders/${order1.id}`)
      .set("Authorization", token);

    expect(response.body.status).toEqual("active");
    //expect(Number(response.body.user_id)).toEqual(user.id as unknown as number);
    expect(Number(response.body.id)).toEqual(order1.id as unknown as number);
  });

  // INDEX
  it("index endpoint should return a list of orders. GET /api/orders/", async (): Promise<void> => {
    const response = await request
      .get("/api/orders/")
      .set("Authorization", token);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].status).toEqual("active");
    expect(response.body[1].status).toEqual("completed");
  });

  // DELETE
  it("delete endpoint should remove the orders", async (): Promise<void> => {
    let response = await request
      .delete(`/api/orders/${order1.id}`)
      .set("Authorization", token);
    expect(response.status).toEqual(200);

    response = await request
      .delete(`/api/orders/${order2.id}`)
      .set("Authorization", token);
    expect(response.status).toEqual(200);
  });

  // Clean up
  afterAll(async (): Promise<void> => {
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
      .send({ id: admin.id })
      .set("Authorization", token);
  });
});
