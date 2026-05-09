import express from 'express'
import { addCart, deleteCart, getCart, updateCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/cart', authMiddleware, getCart);
router.post('/cart', authMiddleware, addCart);
router.put('/cart/:id', authMiddleware, updateCart);
router.delete('/cart/:id', authMiddleware, deleteCart);

export default router;