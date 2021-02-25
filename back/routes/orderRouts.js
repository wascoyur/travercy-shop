import express from 'express';
const router = express.Router();
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from '../controllers/orderController.js';
import { admin, protect } from '../errorMiddleware/authMiddleware.js';

router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);


export default router;
