import express from 'express'
import { addOrder, deleteOrder, getOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router();

router.get('/order', authMiddleware, getOrder);
router.post('/order', authMiddleware, addOrder);
router.delete('/order/:id', authMiddleware, deleteOrder);

export default  router;