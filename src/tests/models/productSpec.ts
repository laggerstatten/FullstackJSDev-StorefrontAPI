import { Product, ProductModel } from "../../models/product";

const model = new ProductModel();
let product1: Product;

describe("Product Model Test Suite", (): void => {
  beforeAll(async () => {

    await model.deleteAll();

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
  it("create method should add a product", async (): Promise<void> => {
    const result = await model.create({
      name: "Product Name",
      price: 99,
      category: "category",
    });

    expect(result).toEqual({
      id: jasmine.any(Number),
      name: "Product Name",
      price: 99,
      category: "category",
    });

    expect(result.id).toBeDefined();
  });

  // INDEX
  it("index method should return a list of products", async (): Promise<void> => {
    const result = await model.index();

    expect(result).toEqual([{
      id: jasmine.any(Number),
      name: "Product Name",
      price: 99,
      category: "category",
    }]);
  });

  // SHOW
  it("show method should return the correct product", async (): Promise<void> => {
    const result = await model.show(1);

    expect(result).toEqual({
      id: 1,
      name: "Product Name",
      price: 99,
      category: "category",
    });
  });


  // DELETE
  it("delete method should remove the product", async (): Promise<void> => {
    await model.delete(0);
    const result = await model.index();

    expect(result).toEqual([]);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
