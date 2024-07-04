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
orders.post("/create/:user_id", authenticate, (request, response) => {
  orderHandler.create(request, response);
});

// DELETE
orders.delete("/deleteOrder/:id", authenticate, (request, response) => {
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

// UPDATE
orders.put("/status/:user_id", authenticate, (request, response) => {
  orderHandler.update(request, response);
});

export default orders;
