const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/register', usersController.registerForm);
router.get('/userRecovery', usersController.userRecovery);

//* CRUD de Users *//
// listado de los usuarios
router.get('/',usersController.list);

// formulario de agregar usuario
router.get('/create',usersController.addForm);
// accion de agregar al usuario
router.post('/create',usersController.create);

// Menu de usuario
router.get('/menu/:id',usersController.menuForm);
router.put('/menu/:id',usersController.edit);
// formulario de edicion de usuario
router.get('/edit/:id',usersController.editForm);
router.put('/edit/:id',usersController.edit);

//accion de borrar usuario
router.delete('/delete/:id',usersController.delete);

module.exports = router;