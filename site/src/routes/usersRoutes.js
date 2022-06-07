const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/userRecovery', usersController.userRecovery);

//* CRUD de Users *//
// listado de los usuarios
router.get('/',usersController.list);

// formulario de agregar usuario
router.get('/create',usersController.addForm);
// accion de agregar al usuario
router.post('/create',usersController.create);

// formulario de edicion de usuario
router.get('/edit/:idUser',usersController.editForm);
router.put('/edit/:idUser',usersController.edit);

//accion de borrar usuario
router.delete('/delete/:idUser',usersController.delete);

module.exports = router;