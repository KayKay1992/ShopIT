import express from 'express';
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser } from '../controller/userController.js'; 


//Route to register a new user
//http://localhost:5000/api/users
router.post('/', registerUser);

//Route to authenticate user
//http://localhost:5000/api/users/login
router.post('/login', authUser);

//Route to get all users
router.get('/', getUsers);

//Route to get current user profile
router.get('/profile', getUserProfile);

//Route to update current user profile
 router.put('/profile', updateUserProfile);

 //Route to delete a user
 router.delete('/:id', deleteUser);

 //Route to update a user
 router.put('/:id', updateUser);

 //Route to logout user
 router.post('/logout', logoutUser);

 //Route to get a single user by ID
 router.get('/:id', getUserById);


export default router;