import express from "express";
import authenticate from "../../middleware/authentication";
import OrderHandler from "../../handlers/order";

const orders = express.Router();
const orderHandler = new OrderHandler();

//Add Products
orders.post("/addProduct", authenticate, (request, response) => {
  orderHandler.addProduct(request, response);
});

// CREATE
orders.post("/:user_id", authenticate, (request, response) => {
  orderHandler.create(request, response);
});

// DELETE
orders.delete("/:id", authenticate, (request, response) => {
  orderHandler.delete(request, response);
});

// INDEX
orders.get("/", authenticate, (request, response) => {
  orderHandler.index(request, response);
});

// SHOW
orders.get("/:id", authenticate, (request, response) => {
  orderHandler.show(request, response);
});

export default orders;
