const express = require('express');
const router = express.Router();
//! probar si funciona este middleware
const uploadUser = require('../middlewares/MulterUsers') 
const { body } = require('express-validator');

const usersController = require('../controllers/usersController');

const validations = [
    body('firstName')
        .notEmpty().withMessage("Debes de ingresar tu nombre").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body('lastName')
        .notEmpty().withMessage("Debes de ingresar tu apellido").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body('email')
        .notEmpty().withMessage("Debes de ingresar tu email").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo electrónico válido"),
    body('password')
        .notEmpty().withMessage("Debes de ingresar una contraseña").bail()
        .isStrongPassword().withMessage("Debes ingresar una contraseña mas fuerte"),
    body('passwordCheck')
        .notEmpty().withMessage("Debes de ingresar una contraseña").bail()
        .custom((valor,{req}) => {
            if (valor !== req.body.password) {
                // Mensaje en caso de no coincidir
                throw new Error("Las contraseñas no coinciden");
            } else {
                return valor;
            }
        }),
];

router.get('/login', usersController.login);
router.get('/userRecovery', usersController.userRecovery);

// Registro de usuarios
router.get('/register', usersController.registerForm);
router.post('/register', validations, usersController.registerAction);

//* CRUD de Users *//
// listado de los usuarios
router.get('/', usersController.list);

// formulario de agregar usuario
router.get('/create', usersController.addForm);
// accion de agregar al usuario
router.post('/create', usersController.create);

// Menu de usuario
router.get('/menu/:id', usersController.menu);
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