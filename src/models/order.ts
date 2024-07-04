import client from "../database/database";

export type Order = {
  id?: number;
  user_id: number;
  products: OrderProduct[];
  status: string;
};

export type OrderProduct = {
  product_id: number;
  order_id?: number;
  quantity: number;
  name?: string;
};

export class OrderModel {


  async addProduct(product: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES(${Number(
        product.order_id
      )}, ${Number(product.product_id)}, ${Number(
        product.quantity
      )}) RETURNING *`;
      const result = await connection.query(sql);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to add new order. Error: ${err}`);
    }
  }


  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";

      const result = await connection.query(sql, [
        order.status,
        Number(order.user_id),
      ]);
      const createdOrder = result.rows[0];

      order.products.forEach(async (p) => {
        const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES(${createdOrder.id
          }, ${Number(p.product_id)}, ${Number(p.quantity)})`;
        await connection.query(sql);
      });

      connection.release();

      return createdOrder;
    } catch (err) {
      throw new Error(`Unable to add new order. Error: ${err}`);
    }
  }


  async delete(id: number): Promise<number> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM order_products WHERE order_id = ($1)";

      await connection.query(sql, [id]);

      const deleteOrderQuery = "DELETE FROM orders WHERE id = ($1)";
      const order = await connection.query(deleteOrderQuery, [id]);
      const count = order.rowCount;

      connection.release();

      return count;
    } catch (err) {
      throw new Error(`Unable to delete order ${id}. Error: ${err}`);
    }
  }


  async deleteAll(): Promise<void> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM order_products";

      await connection.query(sql);

      const deleteOrderQuery = "DELETE FROM orders";
      await connection.query(deleteOrderQuery);

      connection.release();
    } catch (err) {
      throw new Error(`Unable to delete all orders. Error: ${err}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders";

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";

      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get order. Error: ${err}`);
    }
  }


  async update(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = "UPDATE orders SET status = ($1) WHERE id=($2) RETURNING *";

      const result = await connection.query(sql, [order.status, order.id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to update the order. Error: ${err}`);
    }
  }
}
