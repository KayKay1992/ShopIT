import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js'

// Create a new Order
//@route POST/api/orders
//@access private
const addOrderItems =asyncHandler ( async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error ('No order items')
     }else {
        const order = new Order({
            orderItems: orderItems.map((x) =>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
            shippingPrice,
        });
       const createdOrder = await order.save();
        res.status(201).json(createdOrder);
     }
})

// Get logged in user orders
//@route GET/api/orders/myorders
//@access private
const getMyOrders =asyncHandler ( async (req, res) => {
    const orders = await Order.find({
        user: req.user._id,
    });
    res.status(200).json(orders);
   
})

// Get order by Id
//@route GET/api/orders/:id
//@access private
const getOderById =asyncHandler ( async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }else{
        res.status(200).json(order);
    }
   
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






