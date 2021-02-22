import express from 'express';
const router = express.Router();
import { deleteProduct, getProdactById, getProdacts} from '../controllers/productController.js'
import { admin, protect } from '../errorMiddleware/authMiddleware.js';

router.route('/').get(getProdacts);

router.route('/:id').get(getProdactById).delete(protect, admin, deleteProduct);

export default router
