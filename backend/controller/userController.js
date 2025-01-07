import jwt from 'jsonwebtoken'
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";


//@desc Auth user and get a Token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    //Set jwt token as the HTTP-ONLY token

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 86400000), // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict", // Set to "strict" in production

    });
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
  res.send("register user");
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
  res.send("get user profile");
});

//@desc update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
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
