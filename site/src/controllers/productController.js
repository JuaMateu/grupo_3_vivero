const e = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    shop: (req, res) => {
        // READ
        res.render("products/shop", { products })
    },
    list: (req, res) => {
        // READ
        res.render("products/listProducts", { products });
    },

    detail: (req, res) => {
        // READ
        let  [ selectedProduct ]  = products.filter(prod => {return prod.id == req.params.id});
        res.render("products/productDetail", { product : selectedProduct });
    },

    addForm:(req,res)=> {
        // READ
        // accion necesaria para ver el formulario
        res.render("products/addProducts");
    },

    create:(req,res)=> {
        // CREATE
        // recibir formulario crear producto
        // buscamos el maximo id en la base de datos
        let newId = 1
        if (products.length != 0) {
           
            const ids = products.map(prod => {
            return prod.id;
            });
            console.log(ids); // 👉️ [ array de id de productos]
            newId = Math.max(...ids)+1;
            console.log(newId)
        }

        let newProduct = {
            id: newId,
            name: req.body.name,
            type: req.body.type,
            careLevel: req.body.careLevel,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            label: req.body.label,
            img: "/img/plantas/" + req.file.filename,
            sells: 0
        }

        // agregar el producto al array
        products.push(newProduct);

        let productsExport = JSON.stringify(products, null, 2);
        console.log(productsExport)
        fs.writeFileSync(productsFilePath, productsExport, 'utf-8');

        res.redirect("/products/");
    },
    
    editForm:(req,res)=> {
        // READ
        // solicitamos el id de los parametros
        let idProduct = req.params.id;
        // asginamos el id al elemento del array correspondiente
        let  [ editProduct ]  = products.filter(prod => {return prod.id == req.params.id});
        // renderizamos la vista con el elemento correpondiente
        res.render('../views/products/editProducts.ejs',{editProduct:editProduct});
    },
    edit: (req,res) => {
        // UPDATE
        // solicitamos el id de los parametros
        let idProduct = req.params.idProduct;
        // para ajustar el indice recorrido, restamos 1 y situarnos en el elemento correcto
        let editProduct = products[idProduct-1];
        // editamos el producto entrante
        editProduct.name = req.body.name
        editProduct.type = req.body.type
        editProduct.careLevel = req.body.careLevel
        editProduct.description = req.body.description
        editProduct.stock = req.body.stock
        editProduct.price = req.body.price
        editProduct.label = req.body.label
        //validar si cargaron imagen y cambiarla si no no hacer nada
        if (req.file) {
            editProduct.img = "/img/plantas/" + req.file.filename
        }
        editProduct.sells = 0
        // sobreescribimos el JSON
        let productsExport = JSON.stringify(products, null, 2);
        fs.writeFileSync(productsFilePath, productsExport,'utf-8');
        // redirigimos a la lista de productos
        res.redirect("/products/");
    },
    delete:(req,res)=> {
        // DELETE
        // solcitamos el id y con filter, pedimos devolver todos los elementos cuyo id sea distinto al entrante
        let idProduct = req.params.idProduct;
        products = products.filter(product => {
            return product.id != idProduct
        });
        // sobreescribimos el JSON
        let productsExport = JSON.stringify(products, null, 2);
        fs.writeFileSync(productsFilePath, productsExport,'utf-8');
        // redirigimos a la lista de productos
        res.redirect("/products/");
    }
    
}
//para escribir un dato en el archivo copiar este codigo
// products.push(newProduct)
//  let productsExport = JSON.stringify(products, null, 2);
//  fs.writeFileSync(productsFilePath, productsExport);

module.exports = controller