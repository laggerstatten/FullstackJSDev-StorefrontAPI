import client from "../database/database";

export type User = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserModel {

  // CREATE
  async create(user: User): Promise<User> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "INSERT INTO users (first_name, last_name, user_name, password) VALUES($1, $2, $3, $4) RETURNING *";

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

  // DELETE
  async delete(id: number): Promise<number> {
    try {
      // @ts-ignore
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

  // DELETE ALL
  async deleteAll(): Promise<void> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "DELETE FROM users";

      await connection.query(sql);
      connection.release();
    } catch (err) {
      throw new Error(`Unable to delete all users. Error: ${err}`);
    }
  }

  /**
   * Get user based on user_name from the users table in the database
   * @param {string} user_name username of the user to be fetched.
   * @return {User} User object based on the id passed.
  async getUserByUserName(user_name: string): Promise<User> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = `SELECT * FROM users WHERE user_name='${user_name}'`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get user. Error: ${err}`);
    }
  }

  // INDEX
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get users. Error: ${err}`);
    }
  }

  // SHOW
  async show(id: number): Promise<User> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";

      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get user. Error: ${err}`);
    }
  }

}
