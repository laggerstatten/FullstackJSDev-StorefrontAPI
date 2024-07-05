import { Product, ProductModel } from "../../models/product";

const model = new ProductModel();

describe("Product Model Test Suite", (): void => {
  beforeAll(async () => {

    await model.deleteAll();

  });

  const product1: Product = {
    name: "Product Name",
    price: 99,
    category: "category",
  };

  const product2: Product = {
    name: "Name of Product",
    price: 999,
    category: "cat",
  };

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
    const result = await model.create(product1);

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
    const createResult = await model.create(product1);
    const showResult = await model.show(
      createResult.id as unknown as number
    );

    expect(showResult).toEqual(createResult);
  });

  // DELETE
  it("delete method should remove the product", async (): Promise<void> => {
    const createResult = await model.create(product2);
    const deleteResult = await model.delete(
      createResult.id as unknown as number
    );

    expect(deleteResult).toBeGreaterThan(0);
  });

  // Clean up
  afterAll(async () => {
    await model.deleteAll();
  });
});
