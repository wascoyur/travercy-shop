import express from 'express';
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updatetUserProfile,
  getUserById,
} from '../controllers/userController.js';
import { admin, protect } from '../errorMiddleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updatetUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);
router
  .route('/:id')
  .delete(protect, admin, updateUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router;
