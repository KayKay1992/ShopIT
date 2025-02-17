import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  //pagination
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  // keyword search
  const keyword = req.query.keyword? {
    name: {
      $regex: req.query.keyword,
      $options: "i",// optional setting to make it case insensitive
    }
  } : {};

  const totalProducts = await Product.countDocuments({...keyword})
  // Fetch products from your database
  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    products,
    page,
    pages: Math.ceil(totalProducts / pageSize),
  });
});

const getProductById = asyncHandler(async (req, res) => {
  // Fetch product from your database by id
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "sample name",
    image: "/images/sample.jpg",
    description: "sample description",
    brand: "sample brand",
    category: "Sample Category",
    price: 0,
    countInStock: 0,
    numReviews: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  // update product
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({
      _id: product._id,
    });
    res.status(200).json({ message: "Product deleted successfully." });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review successfully added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  try {
    // Fetch top 3 products sorted by rating in descending order
    const products = await Product.find({}) // Use find() to retrieve multiple products
      .sort({ rating: -1 }) // Sort products by rating in descending order
      .limit(3); // Limit the result to top 3 products

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts, // Add this line for the top products route.
}; // Export your functions for use in your ProductRoutes.js file.
