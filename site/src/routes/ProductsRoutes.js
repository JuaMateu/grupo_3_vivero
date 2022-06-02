const express = require('express');
const router = express.Router();

const multer = require('multer');

const productsController = require('../controllers/productController');


// renderiza vista de productos para clientes
router.get('/shop',productsController.shop);

//* CRUD de productos *//
// listar productos
router.get('/',productsController.list);
// mostrar detalle de producto
router.get('/detail/:id', productsController.detail);

//formulario de crear producto
router.get('/create',productsController.addForm);
//acion de crear producto
router.post('/create',productsController.create);

//formulario de editar o borrar producto
router.get('/:id/edit',productsController.edit);
//accion de editar producto
router.put('/:id',productsController.edit);
//accion de borrar producto
router.delete('/:id',productsController.delete);

module.exports = router;