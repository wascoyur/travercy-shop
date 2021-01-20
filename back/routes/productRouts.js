import express from 'express';
const router = express.Router();
import { getProdactById, getProdacts} from '../controllers/productController.js'

router.route('/').get(getProdacts);

router.route('/:id').get(getProdactById);

export default router
