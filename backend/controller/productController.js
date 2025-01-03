import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js'

const getProducts =asyncHandler ( async (req, res) => {
    // Fetch products from your database
    const products = await Product.find({});
    res.json(products);
})



const  getProductById = asyncHandler ( async (req, res) => {
    // Fetch product from your database by id
    const product = await Product.findById(req.params.id);
    if (product) {
       return res.json(product);
    }else {
        res.status(404);
        throw new Error('Resource not found');
    }
})

export { getProducts, getProductById }  // Export your functions for use in your ProductRoutes.js file.
