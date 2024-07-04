import client from "../database/database";

export type User = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserModel {


  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, user_name, password) VALUES($1, $2, $3, $4) RETURNING *";

      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.user_name,
        user.password,
      ]);
      const createdUser = result.rows[0];
      connection.release();

      return createdUser;
    } catch (err) {
      throw new Error(`Unable to add new user ${user.user_name}. Error: ${err}`);
    }
  }


  async delete(id: number): Promise<number> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM users WHERE id = ($1)";

      const result = await connection.query(sql, [id]);
      const count = result.rowCount;
      connection.release();

      return count;
    } catch (err) {
      throw new Error(`Unable to delete user ${id}. Error: ${err}`);
    }
  }


  async deleteAll(): Promise<void> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM users";

      await connection.query(sql);
      connection.release();
    } catch (err) {
      throw new Error(`Unable to delete all users. Error: ${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";

      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get user. Error: ${err}`);
    }
  }


  async update(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        "UPDATE users set first_name = $2, last_name = $3, user_name = $4, password = $5 WHERE id = $1 RETURNING *";

      const result = await connection.query(sql, [
        user.id,
        user.first_name,
        user.last_name,
        user.user_name,
        user.password,
      ]);
      const editedUser = result.rows[0];
      connection.release();

      return editedUser;
    } catch (err) {
      throw new Error(`Unable to update user ${user.user_name}. Error: ${err}`);
    }
  }
}
