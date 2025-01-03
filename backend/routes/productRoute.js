import express from 'express';
const router = express.Router();
// import products from '../data/products.js';
import { getProductById, getProducts } from '../controller/productController.js';


//Route to get all products
router.get('/', getProducts);

//Route to get a single product
router.get('/:id',getProductById);


export default router;