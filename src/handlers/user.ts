import { Response, Request } from "express";
import { UserModel } from "../models/user";

const model = new UserModel();

export default class UserHandler {

  // CREATE
  async create(_request: Request, response: Response) {
    try {
      const { user_name, first_name, last_name, password } = _request.body;
      if (user_name && first_name && last_name && password) {
        const users = await model.create({
          user_name,
          first_name,
          last_name,
          password,
        });
        response
          .status(200)
          .json({ message: "User created successfully", user: users });
      } else {
        response
          .status(400)
          .json({ error: "user_name, first_name, last_name and password are required" });
      }
    } catch (error) {
      response
        .status(500)
        .json(`error while creating user: ${error}`);
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
          .json({ message: `Successfully deleted user with id: ${id}` });
      } else {
        response
          .status(400)
          .json({ message: `Could not delete user with id: ${id}` });
      }
    } catch (error) {
      response
        .status(500)
        .json(`error while deleting the user: ${error}`);
    }
  }

  // INDEX
  async index(_request: Request, response: Response) {
    try {
      const users = await model.index();
      response
        .status(200)
        .json(users);
    } catch (error) {
      response
        .status(500)
        .json(`error while fetching user list: ${error}`);
    }
  }

  // SHOW
  async show(_request: Request, response: Response) {
    try {
      const id = _request.params.id;
      const users = await model.show(Number(id));
      response
        .status(200)
        .json(users);
    } catch (error) {
      response
        .status(500)
        .json(`error while fetching the user: ${error}`);
    }
  }

}
