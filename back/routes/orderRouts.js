import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../errorMiddleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
