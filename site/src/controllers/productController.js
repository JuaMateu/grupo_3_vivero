const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    shop: (req, res) => {
        res.render("products/shop", { products })
    },
    list: (req, res) => {
        res.render("products/listProducts", { products });
    },

    detail: (req, res) => {
        res.render("products/productDetail", { products });
    },

    addForm:(req,res)=> {
        res.render("products/addProducts");
    },

    create:(req,res)=> {
        // recibir formulario crear producto
        let newProduct = {};
        newProduct.id = products.length+1;
        newProduct.name = req.body.name
        newProduct.type = req.body.type
        newProduct.careLevel = req.body.careLevel
        newProduct.description = req.body.description
        newProduct.stock = req.body.stock
        newProduct.price = req.body.price
        newProduct.label = req.body.label
        newProduct.img = req.body.img
        newProduct.sells = 0

        // agregar el producto al array
        products.push(newProduct);

        let productsExport = JSON.stringify(products, null, 2);
        console.log(productsExport)
        fs.writeFileSync(productsFilePath, productsExport, 'utf-8');

        res.redirect("/products/");
    },
    
    editForm:(req,res)=> {
        let idProduct = req.params.idProduct;

        let editProduct = products[idProduct];
        
        res.render('../views/products/editProducts.ejs',{editProduct:editProduct});
    },
    edit: (req,res) => {
        let idProduct = req.params.idProduct;
       
        let editProduct = products[idProduct];
        
        /* let index = products.findIndex(product => {
            if (product.name == editProduct.name) {
                return true;
            }
        }); */
    
        editProduct.name = req.body.name
        editProduct.type = req.body.type
        editProduct.careLevel = req.body.careLevel
        editProduct.description = req.body.description
        editProduct.stock = req.body.stock
        editProduct.price = req.body.price
        editProduct.label = req.body.label
        editProduct.img = req.body.img
        editProduct.sells = 0

        products[idProduct-1] = editProduct;

        let productsExport = JSON.stringify(products, null, 2);
        fs.writeFileSync(productsFilePath, productsExport,'utf-8');
        
        res.redirect("/products/");
    },
    delete:(req,res)=> {

        let idProduct = req.params.idProduct;
        products = products.filter(product => {
            return product.id != idProduct
        });

        let productsExport = JSON.stringify(products, null, 2);
        fs.writeFileSync(productsFilePath, productsExport,'utf-8');
        
        res.redirect("/products/");
    }
    
}
//para escribir un dato en el archivo copiar este codigo
// products.push(newProduct)
//  let productsExport = JSON.stringify(products, null, 2);
//  fs.writeFileSync(productsFilePath, productsExport);

module.exports = controller