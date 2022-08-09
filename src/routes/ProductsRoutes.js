const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');

const uploadProduct = require('../middlewares/multerProducts');

const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const userNotLoggedMiddleware = require('../middlewares/userNotLoggedMiddleware');
const userIsAdmin = require('../middlewares/userAdminMiddleware');

// renderiza vista de productos para clientes
router.get('/shop',productsController.shop);

//* CRUD de productos *//
// listar productos
router.get('/',userNotLoggedMiddleware, userNotLoggedMiddleware, userIsAdmin, productsController.list);

// mostrar detalle de producto
router.get('/detail/:id', productsController.detail);

//formulario de crear producto
router.get('/create', userNotLoggedMiddleware, userIsAdmin, productsController.addForm);

//acion de crear producto
router.post('/create', userNotLoggedMiddleware, userIsAdmin,  uploadProduct.single('img'),productsController.create);

//formulario de editar o borrar producto
router.get('/edit/:id', userNotLoggedMiddleware, userIsAdmin, productsController.editForm);

//accion de editar producto
router.put('/edit/:id', userNotLoggedMiddleware, userIsAdmin,  uploadProduct.single('img'), productsController.edit);

//accion de borrar producto
router.delete('/delete/:id', userNotLoggedMiddleware, userIsAdmin, productsController.delete);

module.exports = router;