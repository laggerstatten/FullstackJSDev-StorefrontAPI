import express from "express";
import authenticate from "../../middleware/authentication";
import OrderHandler from "../../handlers/order";

const orders = express.Router();
const orderHandler = new OrderHandler();

// CREATE
orders.post("/:user_id", authenticate, (request, response) => {
  orderHandler.create(request, response);
});

// INDEX
orders.get("/", authenticate, (request, response) => {
  orderHandler.index(request, response);
});

// SHOW
orders.get("/:id", authenticate, (request, response) => {
  orderHandler.show(request, response);
});

// DELETE
orders.delete("/:id", authenticate, (request, response) => {
  orderHandler.delete(request, response);
});

// ADD PRODUCT
orders.post("/addProduct", authenticate, (request, response) => {
  orderHandler.addProduct(request, response);
});

// GET ORDER BY USER ID
orders.get(
  "/getOrdersByUserID/:id", authenticate, (request, response) => {
    orderHandler.getOrdersByUserID(request, response);
  });

export default orders;
