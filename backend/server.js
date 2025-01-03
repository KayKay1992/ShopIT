import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoute from './routes/productRoute.js'
const port = process.env.PORT || 5000 ;

connectDB(); // Connect to the MongoDB database

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World! My API is running');
})

// Route to get all products
app.use('/api/products', productRoute);

// Error handling middleware

app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`App running on port ${port}`));