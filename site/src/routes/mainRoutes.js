const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/home', mainController.home);
router.get('/shopCart', mainController.cart);
router.post('/', mainController.home);

module.exports = router;