const express = require('express');
const router = express.Router();

const {
  addProductHandler, editProductHandler, getAllProductsHandler, getProductByIdHandler, deleteProductHandler
} = require('./handler');


router.post('/products', addProductHandler);

router.put('/products/:id', editProductHandler);

router.get('/products', getAllProductsHandler);

router.get('/products/:id', getProductByIdHandler);

router.delete('/products/:id', deleteProductHandler);

module.exports = router;