import client from "../database/database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {

  // CREATE
  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";

      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const createdProduct = result.rows[0];
      connection.release();

      return createdProduct;
    } catch (err) {
      throw new Error(`Unable to add new product ${product.name}. Error: ${err}`);
    }
  }

  // INDEX
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products";

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products. Error: ${err}`);
    }
  }

  // SHOW
  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";

      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get product. Error: ${err}`);
    }
  }

  // DELETE
  async delete(id: number): Promise<number> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM products WHERE id = ($1)";

      const result = await connection.query(sql, [id]);
      const count = result.rowCount;

      connection.release();

      return count;
    } catch (err) {
      throw new Error(`Unable to delete product ${id}. Error: ${err}`);
    }
  }

  // DELETE ALL
  async deleteAll(): Promise<void> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM products";

      await connection.query(sql);
      connection.release();
    } catch (err) {
      throw new Error(`Unable to delete all products. Error: ${err}`);
    }
  }


}
