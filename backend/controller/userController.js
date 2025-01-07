import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
// import User from "../models/userModel.js";

//@desc Auth user and get a Token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
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
  res.send("logout user");
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
