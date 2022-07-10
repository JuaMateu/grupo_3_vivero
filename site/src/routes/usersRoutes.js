const express = require('express');
const router = express.Router();
//! probar si funciona este middleware
const uploadUser = require('../middlewares/MulterUsers') 
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const userNotLoggedMiddleware = require('../middlewares/userNotLoggedMiddleware');
const usersController = require('../controllers/usersController');
const userValidations = require("../middlewares/userValidationsRegister");

//Formulario de Login
router.get('/login', userLoggedMiddleware, usersController.login);
router.post('/login', usersController.processLogin);
router.get('/logout', usersController.processLogout);

//Recuperar Cuenta
router.get('/userRecovery', usersController.userRecovery);

// Formulario de Registro
router.get('/register', userLoggedMiddleware, usersController.register);
router.post('/register', userValidations, usersController.processRegister);

//* CRUD de Users *//
// listado de los usuarios
router.get('/', usersController.list);

// formulario de agregar usuario
router.get('/create', usersController.addForm);
// accion de agregar al usuario
router.post('/create', usersController.create);

// Menu de usuario
router.get('/menu/:id', userNotLoggedMiddleware, usersController.menu);
//datos de contacto
router.get('/menu/contact/:id', usersController.contactform);
router.put('/menu/contact/:id', usersController.contactform);
//datos basicos
router.get('/menu/name/:id', usersController.nameForm);
router.put('/menu/name/:id', usersController.nameForm);
//actualizar password
router.get('/menu/password/:id', usersController.passForm);
router.put('/menu/password/:id', usersController.passForm);
//Subir foto
router.get('/menu/avatar/:id', usersController.avatarForm);
router.put('/menu/avatar/:id', uploadUser.single('img'), usersController.avatarAction);
//actualizar mail


// formulario de edicion de usuario
router.get('/edit/:id',usersController.editForm);
router.put('/edit/:id',usersController.edit);

//accion de borrar usuario
router.delete('/delete/:id',usersController.delete);

module.exports = router;