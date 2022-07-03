const express = require('express');
const router = express.Router();
//! probar si funciona este middleware
const uploadUser = require('../middlewares/MulterUsers') 
const { body } = require('express-validator');

const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const userNotLoggedMiddleware = require('../middlewares/userNotLoggedMiddleware');

const usersController = require('../controllers/usersController');

const validations = [
    body('firstName')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer nombre").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body('lastName')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer apellido").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body('email')
        .notEmpty().withMessage("Debes de ingresar tu email").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo electrónico válido"),
    body('password')
        .trim()
        .notEmpty().withMessage("Debes de ingresar una contraseña").bail()
        .isStrongPassword().withMessage("Tu contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo"),
    body('passwordCheck')
        .trim()
        .notEmpty().withMessage("Debes de ingresar una contraseña").bail()
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                // Mensaje en caso de no coincidir
                throw new Error("Las contraseñas no coinciden");
            } 
            return true;
        }),
];

//Formulario de Login
router.get('/login', userLoggedMiddleware, usersController.login);
router.post('/login', usersController.processLogin);
router.get('/logout', usersController.processLogout);

//Recuperar Cuenta
router.get('/userRecovery', usersController.userRecovery);

// Formulario de Registro
router.get('/register', userLoggedMiddleware, usersController.register);
router.post('/register', validations, usersController.processRegister);

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