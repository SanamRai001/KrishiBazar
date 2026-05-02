import express from 'express'
import { addCart, deleteCart, getCart, updateCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/cart/:id', getCart);
router.post('/cart', addCart);
router.put('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart);

export default router;