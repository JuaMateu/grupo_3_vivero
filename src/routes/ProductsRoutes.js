const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');
const productsControllerV2 = require('../controllers/productControllerV2');

const uploadProduct = require('../middlewares/multerProducts');

// renderiza vista de productos para clientes
router.get('/shop',productsController.shop);

//* CRUD de productos *//
// listar productos
router.get('/prueba',productsControllerV2.list);
router.get('/',productsController.list);
// mostrar detalle de producto
router.get('/detail/:id', productsController.detail);

//formulario de crear producto
router.get('/create',productsController.addForm);
//acion de crear producto
router.post('/create', uploadProduct.single('img'),productsController.create);

//formulario de editar o borrar producto
router.get('/edit/:id',productsController.editForm);
//accion de editar producto
router.put('/edit/:id', uploadProduct.single('img'), productsController.edit);
//accion de borrar producto
router.delete('/delete/:id',productsController.delete);

module.exports = router;