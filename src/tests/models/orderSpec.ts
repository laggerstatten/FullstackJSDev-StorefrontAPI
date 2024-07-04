import { Order, OrderModel } from "../../models/order";
import { User, UserModel } from "../../models/user";
import { Product, ProductModel } from "../../models/product";

const model = new OrderModel();
let order1: Order;

const productModel = new ProductModel();
let product1: Product;

const userModel = new UserModel();
let user1: User;

describe("Order Model Test Suite", (): void => {
  beforeAll(async () => {
    user1 = await userModel.create({
      user_name: "tom_jerry",
      first_name: "Thomas",
      last_name: "Jasper Cat",
      password: "TomAndJerry",
    });

    product1 = await productModel.create({
      name: "Penne Pasta",
      price: 80,
      category: "food",
    });

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

  it("should have update method", () => {
    expect(model.update).toBeDefined();
  });

  it("should have delete method", () => {
    expect(model.delete).toBeDefined();
  });

  // CREATE
  it("should create a order", async (): Promise<void> => {
    order1 = await model.create({
      status: "active",
      user_id: user1.id as unknown as number,
      products: [
        {
          product_id: product1.id as unknown as number,
          quantity: 1,
        },
      ],
    });
    expect(Number(order1.user_id)).toEqual(user1.id as unknown as number);
    expect(order1.status).toEqual("active");
    expect(order1.id).toBeDefined();
  });

  // GET ALL
  it("should get all orders", async (): Promise<void> => {
    const getAllOrders = await model.index();

    expect(getAllOrders.length).toBe(2);
    expect(getAllOrders[0].user_id).toEqual(order1.user_id);
    expect(getAllOrders[0].status).toEqual(order1.status);
  });

  // GET BY ID
  it("should get order based on id", async (): Promise<void> => {
    const order = await model.show(order1.id as unknown as number);

    expect(order.user_id).toEqual(order1.user_id);
    expect(order.status).toEqual(order1.status);
  });

  // UPDATE
  it("should update order status", async (): Promise<void> => {
    const order = await model.update({
      id: order1.id as unknown as number,
      status: "completed",
      products: [],
      user_id: user1.id as unknown as number,
    });

    expect(order.status).not.toEqual(order1.status);
  });

  // DELETE
  it("should delete the order", async (): Promise<void> => {
    await model.delete(order1.id as unknown as number);
    const result = await model.index();

    expect(result.length).toBe(1);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
    await productModel.deleteAll();
    await userModel.deleteAll();
  });
});
