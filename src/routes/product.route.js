import express from 'express';
const router = express.Router();
import ProductController from '../controllers/Product.controller.js';
import requiredLogin from '../middlewares/tokenRequired.js';
import requiredRole from '../middlewares/roleRequired.js';

// token access required
router.use(requiredLogin)

//find all
router.get('/products', requiredRole(['admin']), ProductController.findAll);
 
// find One by ID
router.get('/products/:id', requiredRole(['admin']), ProductController.findOne);

// create a new product
router.post('/products', requiredRole(['admin']), ProductController.create);

// update product
router.put('/products/:id', requiredRole(['admin']), ProductController.update);

// delete product
router.delete('/products/:id', requiredRole(['admin']), ProductController.remove);

export default router;