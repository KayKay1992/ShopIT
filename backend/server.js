import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import products from './data/products.js';

const port = process.env.PORT || 5000 ;

connectDB(); // Connect to the MongoDB database

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World! My API is running');
})

//Route to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
})

//Route to get a single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
})


app.listen(port, ()=> console.log(`App running on port ${port}`));