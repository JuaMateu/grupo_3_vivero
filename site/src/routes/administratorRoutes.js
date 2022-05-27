const express = require('express');
const router = express.Router();

const administratorController = require('../controllers/administratorController');

router.get('/manageProducts', administratorController.main);


module.exports = router;