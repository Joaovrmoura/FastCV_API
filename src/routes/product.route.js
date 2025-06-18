const express = require('express')
const {
  findAll,
  findOne, 
  create, 
  update, 
  remove,
} = require('../controllers/Product.controller');
const router = express.Router();

//find all
router.get('/api/products', findAll);
 
// find One by ID
router.get('/api/products/:id', findOne);

// create a new product
router.post('/api/products', create);

// update product
router.put('/api/products/:id', update);

// delete product
router.delete('/api/products/:id', remove);

module.exports = router;