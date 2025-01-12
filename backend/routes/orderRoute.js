import express from "express";
const router = express.Router();
import {
    addOrderItems, getMyOrders, getOderById, updateOrderToPaid, updateOrderToDelivered, getOrders
} from "../controller/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//Route to add order items
router.post("/",protect, addOrderItems);

//Route to get my order
router.get("/myorders", protect, getMyOrders);

//Route to get all orders
//http://localhost:5000/api/orders
router.get("/", protect, admin, getOrders);

//Route to get order by id
router.get("/:id", protect, getOderById);

//Route to update order to paid 
router.put("/:id/pay", protect, updateOrderToPaid);

//Route to update order to delivered
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);



export default router;




