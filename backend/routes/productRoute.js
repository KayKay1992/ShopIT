import express from "express";
const router = express.Router();
// import products from '../data/products.js';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//Route to get all products
router.get("/", getProducts);

//Route to get top rated products

router.get("/top", getTopProducts);

//Route to get a single product
router.get("/:id", getProductById);

//Route to update a  product
router.put("/:id", protect, admin, updateProduct);

//Route to create a new product
router.post("/", protect, admin, createProduct);

//Route to delete a product
router.delete("/:id", protect, admin, deleteProduct);

//Route to create a new review
router.post("/:id/reviews", protect, createProductReview);

export default router;
