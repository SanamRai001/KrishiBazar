import express from 'express'
import { addOrder, deleteOrder, getOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/order', getOrder);
router.post('/order', addOrder);
router.delete('/order/:id', deleteOrder);

export default  router;