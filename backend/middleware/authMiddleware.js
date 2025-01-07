import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Middleware to verify JWT token
// protect routes 

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the jwt from the cookie
    token = req.cookies.jwt;
    
    // Check if token exists
    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Check if user exists in the database
          req.user =  await User.findById(decoded.userId).select('-password');
          next();
     }catch(error){
         // Token is invalid
         res.status(401)
         throw new Error('Not authorized, no token found')
       }
    }else{
        // Token is invalid
     res.status(401)
     throw new Error('Not authorized, no token found')
  }
})

// Middleware to check if user is admin

export const admin = asyncHandler(async (req, res, next) => {
    // Check if user is admin
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(403)
        throw new Error('Unauthorized, not an admin')
    }
})