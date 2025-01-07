
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
const port = process.env.PORT || 5000 ;

connectDB(); // Connect to the MongoDB database

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Route to test if the API is running
app.get('/', (req, res) => {
    res.send('Hello, World! My API is running');
})

// Route to get all products
app.use('/api/products', productRoute);

// Route to get all users
app.use('/api/users', userRoute);

// Error handling middleware

app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`App running on port ${port}`));