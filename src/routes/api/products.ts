import express from "express";
import authenticate from "../../middleware/authentication";
import ProductHandler from "../../handlers/product";

const products = express.Router();
const productHandler = new ProductHandler();

// CREATE
products.post("/", authenticate, (request, response) => {
  productHandler.create(request, response);
});

// DELETE
products.delete("/:id", (request, response) => {
  productHandler.delete(request, response);
});

// INDEX
products.get("/", (request, response) => {
  productHandler.index(request, response);
});

// SHOW
products.get("/:id", (request, response) => {
  productHandler.show(request, response);
});

export default products;
