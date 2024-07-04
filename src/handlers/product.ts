import { Response, Request } from "express";
import { ProductModel } from "../models/product";

const model = new ProductModel();

export default class ProductHandler {

  // CREATE
  async create(_request: Request, response: Response) {
    try {
      const { name, price, category } = _request.body;
      if (name && price) {
        const product = await model.create({
          name,
          price: Number(price),
          category,
        });
        response
          .status(200)
          .json({ message: "Product created successfully", product: product });
      } else {
        response
          .status(400)
          .json({ error: "name and price are required" });
      }
    } catch (error) {
      response
        .status(500)
        .json(`error while creating product: ${error}`);
    }
  }

  // DELETE
  async delete(_request: Request, response: Response) {
    try {
      const { id } = _request.params;
      const rowCount = await model.delete(Number(id));
      if (rowCount > 0) {
        response
          .status(200)
          .json({ message: `Successfully deleted product with id: ${id}` });
      } else {
        response
          .status(400)
          .json({ message: `Could not delete product with id: ${id}` });
      }
    } catch (error) {
      response
        .status(500)
        .json(`error while deleting the product: ${error}`);
    }
  }

  // INDEX
  async index(_request: Request, response: Response) {
    try {
      const products = await model.index();
      response
        .status(200)
        .json(products);
    } catch (error) {
      response
        .status(500)
        .json(`error while fetching product list: ${error}`);
    }
  }

  // SHOW
  async show(_request: Request, response: Response) {
    try {
      const id = _request.params.id;
      const products = await model.show(Number(id));
      response
        .status(200)
        .json(products);
    } catch (error) {
      response
        .status(500)
        .json(`error while fetching the product: ${error}`);
    }
  }

  // UPDATE
  async update(_request: Request, response: Response) {
    try {
      const { id } = _request.params;
      const { name, price, category } = _request.body;

      const product = await model.update({
        id: Number(id),
        name,
        price: Number(price),
        category,
      });

      response
        .status(200)
        .json(product);
    } catch (error) {
      response
        .status(500)
        .json(`error while updating the product: ${error}`);
    }
  }
}
