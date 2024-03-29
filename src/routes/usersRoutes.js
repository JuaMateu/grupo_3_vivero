const express = require("express");
const router = express.Router();

// Middlewares
const uploadUser = require("../middlewares/multerUsers");
const userLoggedMiddleware = require("../middlewares/userLoggedMiddleware");
const userNotLoggedMiddleware = require("../middlewares/userNotLoggedMiddleware");
const usersController = require("../controllers/usersController");
const userIsAdmin = require("../middlewares/userAdminMiddleware");
const UserContactValidator = require("../middlewares/Validations/usersContactValidator");
const userUpdateAdminValidator = require("../middlewares/Validations/userUpdateAdminValidator");

const usersMenuRoutes = require("./usersMenuRoutes");

const userValidations = require("../middlewares/Validations/userValidationsRegister");
const userAddAdminValidator = require("../middlewares/Validations/userAddAdminValidator");

//Formulario de Login
router.get("/login", userLoggedMiddleware, usersController.login);
router.post("/login", usersController.processLogin);
router.get("/logout", usersController.processLogout);

//Recuperar Cuenta
router.get("/userRecovery", usersController.userRecovery);

// Formulario de Registro
router.get("/register", userLoggedMiddleware, usersController.register);
router.post("/register", userValidations, usersController.processRegister);

//* CRUD de Users *//
// listado de los usuarios
router.get("/", userNotLoggedMiddleware, userIsAdmin, usersController.list);

// formulario de agregar usuario
router.get(
  "/create",
  userNotLoggedMiddleware,
  userIsAdmin,
  usersController.addForm
);
// accion de agregar al usuario
router.post(
  "/create",
  userNotLoggedMiddleware,
  userIsAdmin,
  uploadUser.single("img"),
  userAddAdminValidator,
  usersController.create
);

// Menu de usuario //
router.use("/menu/", usersMenuRoutes);

// formulario de edicion de usuario
router.get(
  "/edit/:id",
  userNotLoggedMiddleware,
  userIsAdmin,
  usersController.editForm
);
router.put(
  "/edit/:id",
  userNotLoggedMiddleware,
  userIsAdmin,
  uploadUser.single("img"),
  userUpdateAdminValidator,
  usersController.edit
);
router.put(
  "/editAddress/:id",
  userNotLoggedMiddleware,
  userIsAdmin,
  UserContactValidator,
  usersController.editAddress
);

//accion de borrar usuario
router.delete(
  "/delete/:id",
  userNotLoggedMiddleware,
  userIsAdmin,
  usersController.delete
);

module.exports = router;
