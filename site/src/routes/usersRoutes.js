const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/userRecovery', usersController.userRecovery);

//* CRUD de Users *//
// listado de los usuarios
router.get('/',usersController.list);

router.get('/create',usersController.addForm);

module.exports = router;