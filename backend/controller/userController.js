import jwt from 'jsonwebtoken'
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';


//@desc Auth user and get a Token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
     generateToken(user._id, res)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register a user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {

  //getting the user details from the database
  const { name, email, password } = req.body;

  //Checking if the user already exists in the database
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  //Creating a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  //Checking if the user was successfully created
  if(user){
    generateToken(user._id, res)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }else{
    res.status(400).json({message: "Failed to create user"})
  }
});

//@desc logout user and clear cookie
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() - 1),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'strict'
  });
  res.status(200).json({
    message: "Logged out successfully"
  })
});

//@desc get user profile
//@route GET /api/users/profile
//@access public
const getUserProfile = asyncHandler(async (req, res) => {
  //Getting the user profile
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }else{
    res.status(404);
    throw new Error("User not found");
  }
  
});

//@desc update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
 //Getting the user;
 const user = await User.findById(req.user._id);
 if (user) {
   //Updating the user details
   user.name = req.body.name || user.name;
   user.email = req.body.email || user.email;
   if (req.body.password) {
     user.password = req.body.password
   }
   //Saving the user
   const updatedUser = await user.save();
   res.status(200).json({
     _id: updatedUser._id,
     name: updatedUser.name,
     email: updatedUser.email,
     isAdmin: updatedUser.isAdmin,
   });
 }else{
   res.status(404);
   throw new Error("User not found");
 }
});

//@desc Get all users
//@route GET /api/users
//@access private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get users");
});

//@desc Get  user by id
//@route GET /api/users/:id
//@access private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by id");
});

//@desc Delete User
//@route DELETE /api/users/:id
//@access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//@desc update User
//@route PUT /api/users/:id
//@access private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
