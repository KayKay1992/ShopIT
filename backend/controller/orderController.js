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
//@route PUT/api/orders/:id/pay
//@access protected
const updateOrderToPaid =asyncHandler ( async (req, res) => {
   const order = await Order.findById(req.params.id);

   if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult= {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);

   }else{
    res.status(404);
        throw new Error('Order not found');
   }
   
})

// Update order to Delivered
//@route PUT/api/orders/:id/delivered
//@access protected/admin
const updateOrderToDelivered =asyncHandler ( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
   
})

// Update Get all Orders
//@route GET/api/orders
//@access protected/admin
const getOrders = asyncHandler(async (req, res) => {
    try {
      const pageSize = 4; // Number of orders per page
      const page = Number(req.query.pageNumber) || 1; // Page number from the query string (default to 1)
      
      // Get the total number of orders
      const totalOrders = await Order.countDocuments();
      
      // Get the orders for the current page, populate user details and apply pagination
      const orders = await Order.find({})
        .populate('user', 'id name email') // Populate user details
        .limit(pageSize) // Limit the number of orders per page
        .skip(pageSize * (page - 1)); // Skip the orders of previous pages based on the current page number
      
      // Calculate total pages
      const totalPages = Math.ceil(totalOrders / pageSize);
  
      // Send the response with orders, current page, total pages, and total orders
      res.status(200).json({
        orders,
        page,
        pages: totalPages,
        totalOrders,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export { addOrderItems, getMyOrders, getOderById, updateOrderToPaid, updateOrderToDelivered, getOrders }






