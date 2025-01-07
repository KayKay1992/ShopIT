// Import required modules
import jwt from 'jsonwebtoken';

//to generate jwt token

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      
      //Set jwt token as the HTTP-ONLY token
  
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 86400000), // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: "strict", // Set to "strict" in production
  
      });
};

export default generateToken;

