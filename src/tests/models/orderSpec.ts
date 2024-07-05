import { Order, OrderModel } from "../../models/order";
import { User, UserModel } from "../../models/user";
import { Product, ProductModel } from "../../models/product";

const model = new OrderModel();
let order1: Order;
let order2: Order;

const productModel = new ProductModel();
let product1: Product;
let product2: Product;
let product3: Product;

const userModel = new UserModel();
let user1: User;
let user2: User;

describe("Order Model Test Suite", (): void => {
  beforeAll(async () => {


    user1 = await userModel.create({
      first_name: "First",
      last_name: "Last",
      user_name: "username",
      password: "password123",
    });

    user2 = await userModel.create({
      first_name: "User",
      last_name: "Smith",
      user_name: "username2",
      password: "password456",
    });

    product1 = await productModel.create({
      name: "Wood Chipper",
      price: 9999,
      category: "timber",
    });

    product2 = await productModel.create({
      name: "Garden Tractor",
      price: 99999,
      category: "tractor",
    });

    product3 = await productModel.create({
      name: "Chainsaw",
      price: 9999,
      category: "timber",
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
  it("create method should add an order", async (): Promise<void> => {
    order1 = await model.create({
      status: "active",
      user_id: user1.id as unknown as number,
      products: [
        {
          product_id: product1.id as unknown as number,
          quantity: 6,
        },
        {
          product_id: product2.id as unknown as number,
          quantity: 7,
        },
      ],
    });
    expect(Number(order1.user_id)).toEqual(user1.id as unknown as number);
    expect(order1.status).toEqual("active");
    expect(order1.id).toBeDefined();

    order2 = await model.create({
      status: "completed",
      user_id: user2.id as unknown as number,
      products: [
        {
          product_id: product1.id as unknown as number,
          quantity: 8,
        },
        {
          product_id: product2.id as unknown as number,
          quantity: 9,
        },
      ],
    });
    expect(Number(order2.user_id)).toEqual(user2.id as unknown as number);
    expect(order2.status).toEqual("completed");
    expect(order2.id).toBeDefined();
  });

  // INDEX
  it("index method should return a list of orders", async (): Promise<void> => {
    const getAllOrders = await model.index();

    expect(getAllOrders.length).toBe(2);
    expect(getAllOrders[0].user_id).toEqual(order1.user_id);
    expect(getAllOrders[0].status).toEqual(order1.status);
    expect(getAllOrders[1].user_id).toEqual(order2.user_id);
    expect(getAllOrders[1].status).toEqual(order2.status);
  });

  // SHOW
  it("show method should return the correct order", async (): Promise<void> => {
    const order = await model.show(order1.id as unknown as number);

    //expect(order.user_id).toEqual(order1.user_id);
    expect(order.id).toEqual(order1.id);
    expect(order.status).toEqual(order1.status);
  });

  // ADD PRODUCT
  it("addProduct method should add product to the order", async (): Promise<void> => {
    const addedProduct = await model.addProduct({
      product_id: product3.id as unknown as number,
      order_id: order1.id as unknown as number,
      quantity: 1,
    });

    expect(Number(addedProduct.order_id)).toEqual(
      order1.id as unknown as number
    );
    expect(addedProduct.quantity).toEqual(1);
  });

  // GET ORDER BY USER ID
  it("getOrdersByUserID method should get order", async (): Promise<void> => {
    const activeOrder = await model.getOrdersByUserID(
      user1.id as unknown as number
    );
    expect(activeOrder.length).toEqual(3);
    expect(Number(activeOrder[0].id)).toEqual(order1.id as unknown as number);
  });

  // DELETE
  it("delete method should remove the order", async (): Promise<void> => {
    await model.delete(order1.id as unknown as number);
    const result = await model.index();

    expect(result.length).toBe(1);

    expect(result[0].user_id).toEqual(order2.user_id);
    expect(result[0].status).toEqual(order2.status);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
    await productModel.deleteAll();
    await userModel.deleteAll();
  });
});
