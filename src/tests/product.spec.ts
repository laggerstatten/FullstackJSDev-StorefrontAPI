import { Product, ProductModel } from "../models/product";

const model = new ProductModel();

let product1: Product;

// test suite
describe("Product Model Test Suite", (): void => {
  // methods
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
  it("should create a product", async (): Promise<void> => {
    product1 = await model.create({
      name: "Product Name",
      price: 99,
      category: "Product Category",
    });

    expect(product1.name).toEqual("Product Name");
    expect(product1.price).toEqual(99);
    expect(product1.category).toEqual("Product Category");
    expect(product1.id).toBeDefined();
  });


  // QUERY ID
  it("should get product based on id", async (): Promise<void> => {
    const product = await model.show(product1.id as unknown as number);

    expect(product.name).toEqual(product1.name);
    expect(product.price).toEqual(product1.price);
    expect(product.category).toEqual(product1.category);
  });


  // DELETE
  it("should delete the product", async (): Promise<void> => {
    await model.delete(product1.id as unknown as number);
    const result = await model.index();

    expect(result.length).toBe(0);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
