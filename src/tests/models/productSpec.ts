import { Product, ProductModel } from "../../models/product";

const model = new ProductModel();
let product1: Product;
let product2: Product;

describe("Product Model Test Suite", (): void => {
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
  it("create method should add a product", async (): Promise<void> => {
    product1 = await model.create({
      name: "Log Splitter",
      price: 80,
      category: "timber",
    });
    expect(product1.name).toEqual("Log Splitter");
    expect(product1.price).toEqual(80);
    expect(product1.category).toEqual("timber");
    expect(product1.id).toBeDefined();

    product2 = await model.create({
      name: "Rear-Tine Tiller",
      price: 100,
      category: "garden",
    });
    expect(product2.name).toEqual("Rear-Tine Tiller");
    expect(product2.price).toEqual(100);
    expect(product2.category).toEqual("garden");
    expect(product2.id).toBeDefined();
  });

  // INDEX
  it("index method should return a list of products", async (): Promise<void> => {
    const getAll = await model.index();

    expect(getAll.length).toBe(2);
    expect(getAll[0].name).toEqual(product1.name);
    expect(getAll[1].name).toEqual(product2.name);
    expect(getAll[0].price).toEqual(product1.price);
    expect(getAll[1].price).toEqual(product2.price);
    expect(getAll[0].category).toEqual(product1.category);
    expect(getAll[1].category).toEqual(product2.category);
  });

  // SHOW
  it("show method should return the correct product", async (): Promise<void> => {
    const product = await model.show(product1.id as unknown as number);

    expect(product.name).toEqual(product1.name);
    expect(product.price).toEqual(product1.price);
    expect(product.category).toEqual(product1.category);
  });

  // DELETE
  it("delete method should remove the user", async (): Promise<void> => {
    await model.delete(product1.id as unknown as number);
    const result = await model.index();

    expect(result.length).toBe(1);

    expect(result[0].name).toEqual(product2.name);
    expect(result[0].price).toEqual(product2.price);
    expect(result[0].category).toEqual(product2.category);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
