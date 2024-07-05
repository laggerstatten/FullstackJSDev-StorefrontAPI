import express from "express";
import authenticate from "../../middleware/authentication";
import ProductHandler from "../../handlers/product";

const products = express.Router();
const productHandler = new ProductHandler();

// CREATE
products.post("/create", authenticate, (request, response) => {
  productHandler.create(request, response);
});

// DELETE
products.delete("/:id", (request, response) => {
  productHandler.delete(request, response);
});

// INDEX
products.get("/category/:category", (request, response) => {
  productHandler.getProductsByCategory(request, response);
});

products.get("/", (request, response) => {
  productHandler.index(request, response);
});

// SHOW
products.get("/popular", (request, response) => {
  productHandler.getPopularProducts(request, response);
});

products.get("/:id", (request, response) => {
  productHandler.show(request, response);
});

products.put("/:id", (request, response) => {
  productHandler.update(request, response);
});

export default products;
