import express from "express";
import authenticate from "../../middleware/authentication";
import UserHandler from "../../handlers/user";

const users = express.Router();
const userHandler = new UserHandler();

// CREATE
users.post("/", (request, response) => {
  userHandler.create(request, response);
});

// DELETE
users.delete("/:id", authenticate, (request, response) => {
  userHandler.delete(request, response);
});

//Login - verify password and generate token again
/**
  users.post("/login", (request, response) => {
    userHandler.login(request, response);
  });
*/

// INDEX
users.get("/", authenticate, (request, response) => {
  userHandler.index(request, response);
});

// SHOW
users.get("/:id", authenticate, (request, response) => {
  userHandler.show(request, response);
});

export default users;
