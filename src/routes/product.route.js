import express from 'express';
const router = express.Router();
import ProductController from '../controllers/Product.controller.js';
import requiredLogin from '../middlewares/tokenRequired.js';
import requiredRole from '../middlewares/roleRequired.js';

// router.use(requiredLogin)
router.use(requiredRole(['admin']))
router.use(requiredLogin)
//find all
router.get('/api/products', ProductController.findAll);
 
// find One by ID
router.get('/api/products/:id', ProductController.findOne);

// create a new product
router.post('/api/products', ProductController.create);

// update product
router.put('/api/products/:id', ProductController.update);

// delete product
router.delete('/api/products/:id', ProductController.remove);

export default router;