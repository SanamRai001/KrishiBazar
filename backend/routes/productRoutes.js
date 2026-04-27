import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getAProduct, updateProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getAProduct);
router.post('/products', authMiddleware, addProduct);
router.put('/products/:id', authMiddleware, updateProduct);
router.delete('/products/:id', authMiddleware, deleteProduct);
export default router;