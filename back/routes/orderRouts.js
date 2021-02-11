import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../errorMiddleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);

export default router;
