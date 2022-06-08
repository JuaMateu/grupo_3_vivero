const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productsController = require('../controllers/productController');

const productsStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/img/plantas'));
    },
    filename: (req,file,cb) => {
        console.log(file);
        cb(null,'planta-'+Date.now()+path.extname(file.originalname));
    }
});

const uploadProduct = multer({storage:productsStorage});

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
router.post('/create', uploadProduct.single('img'),productsController.create);

//formulario de editar o borrar producto
router.get('/edit/:idProduct',productsController.editForm);
//accion de editar producto
router.put('/edit/:idProduct', uploadProduct.single('img'), productsController.edit);
//accion de borrar producto
router.delete('/delete/:idProduct',productsController.delete);

module.exports = router;