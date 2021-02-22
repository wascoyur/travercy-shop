import express from 'express';
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getProdactById,
  getProdacts,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../errorMiddleware/authMiddleware.js';

router.route('/').get(getProdacts).post(protect, admin, createProduct);

router
  .route('/:id')
  .get(getProdactById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
