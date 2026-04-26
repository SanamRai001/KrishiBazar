import express from 'express'
import { getAllProducts, getAProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product:id', getAProduct);

export default router;