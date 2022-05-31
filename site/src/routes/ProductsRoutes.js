const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');

router.get('/productDetail', productsController.detail);
router.get('/listProducts',productsController.list);
router.get('/addProducts',productsController.add);
router.get('/editProducts',productsController.edit);
router.post('/addProducts',productsController.add);
router.post('/editProducts',productsController.edit);

module.exports = router;