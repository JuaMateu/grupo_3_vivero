const express = require('express');
const router = express.Router();
//! probar si funciona este middleware
const uploadUser = require('../middlewares/multerUsers') 
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const userNotLoggedMiddleware = require('../middlewares/userNotLoggedMiddleware');
const usersMenuController = require('../controllers/usersMenuController');


const basicDataUserValidator = require("../middlewares/Validations/basicDataUserValidator");
const usersMenuPasswordValidator = require("../middlewares/Validations/usersMenuPassValidator");
const usersMenuusersContactValidator = require("../middlewares/Validations/usersContactValidator");

// Menu de usuario //
router.get('/', userNotLoggedMiddleware, usersMenuController.menu);
//datos de contacto
router.get('/contact', userNotLoggedMiddleware, usersMenuController.contactform);
router.put('/contact', userNotLoggedMiddleware, usersMenuusersContactValidator, usersMenuController.contactAction);
//datos basicos
router.get('/name', userNotLoggedMiddleware, usersMenuController.nameForm);
router.put('/name', userNotLoggedMiddleware, basicDataUserValidator, usersMenuController.nameAction);
//actualizar password
router.get('/password', userNotLoggedMiddleware, usersMenuController.passForm);
router.put('/password', userNotLoggedMiddleware, usersMenuPasswordValidator, usersMenuController.passwordUpdate);
//Subir foto
router.get('/avatar', userNotLoggedMiddleware, usersMenuController.avatarForm);
router.put('/avatar', userNotLoggedMiddleware, uploadUser.single('img'), usersMenuController.avatarAction);
//actualizar mail
// router.get('/menu/mail', userNotLoggedMiddleware, usersMenuController.avatarForm);
// router.put('/menu/mail', userNotLoggedMiddleware, uploadUser.single('img'), usersMenuController.avatarAction);
//actualizar mail

module.exports = router;