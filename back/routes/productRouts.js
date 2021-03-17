import express from 'express';
const router = express.Router();
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProdactById,
  getProdacts,
  updateProduct,
  getTopProducts
} from '../controllers/productController.js';
import { admin, protect } from '../errorMiddleware/authMiddleware.js';

router.route('/').get(getProdacts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts)

router
  .route('/:id')
  .get(getProdactById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
