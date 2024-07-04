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

    await model.deleteAll();
    await productModel.deleteAll();
    await userModel.deleteAll();

    user1 = await userModel.create({
      first_name: "First",
      last_name: "Last",
      user_name: "username",
      password: "password123",
    });

    product1 = await productModel.create({
      name: "Product Name",
      price: 99,
      category: "category",
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

  it("should have delete method", () => {
    expect(model.delete).toBeDefined();
  });

  // CREATE
  it("create method should add a order", async (): Promise<void> => {
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

  // INDEX
  it("index method should return a list of orders", async (): Promise<void> => {
    const getAllOrders = await model.index();

    expect(getAllOrders.length).toBe(1);
    expect(getAllOrders[0].user_id).toEqual(order1.user_id);
    expect(getAllOrders[0].status).toEqual(order1.status);
  });

  // SHOW
  it("show method should return the correct order", async (): Promise<void> => {
    const order = await model.show(order1.id as unknown as number);

    expect(order.user_id).toEqual(order1.user_id);
    expect(order.status).toEqual(order1.status);
  });


  // DELETE
  it("delete method should remove the order", async (): Promise<void> => {
    await model.delete(order1.id as unknown as number);
    const result = await model.index();

    expect(result.length).toBe(0);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
    await productModel.deleteAll();
    await userModel.deleteAll();
  });
});
