import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js'

// Create a new Order
//@route POST/api/orders
//@access private
const addOrderItems =asyncHandler ( async (req, res) => {
    res.send('add order items');
   
})

// Get logged in user orders
//@route GET/api/orders/myorders
//@access private
const getMyOrders =asyncHandler ( async (req, res) => {
    res.send('Get my Orders');
   
})

// Get order by Id
//@route GET/api/orders/:id
//@access private
const getOderById =asyncHandler ( async (req, res) => {
    res.send('Get Order by Id');
   
})

// Update order to paid
//@route GET/api/orders/:id/pay
//@access protected
const updateOrderToPaid =asyncHandler ( async (req, res) => {
    res.send('Update Order to Paid');
   
})

// Update order to Delivered
//@route GET/api/orders/:id/delivered
//@access protected/admin
const updateOrderToDelivered =asyncHandler ( async (req, res) => {
    res.send('Update Order to Delivered');
   
})

// Update Get all Orders
//@route GET/api/orders
//@access protected/admin
const getOrders =asyncHandler ( async (req, res) => {
    res.send('Get All Orders');
   
})

export { addOrderItems, getMyOrders, getOderById, updateOrderToPaid, updateOrderToDelivered, getOrders }






