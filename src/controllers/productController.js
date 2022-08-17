const { response } = require('express');
const db = require("../database/models");


const controller = {
    shop: (req, res) => {
         // READ
         db.Product.findAll()
         .then((products) => {
             res.render("products/shop", { products })
         });
    },
    list: (req, res) => {
        // READ
        db.Product.findAll({include: ["category"]})
         .then((products) => {
             res.render("products/listProducts", { products })
         });
    },

    detail: (req, res) => {
        let productPromise = db.Product.findByPk(req.params.id)
        let productsPromise = db.Product.findAll()
        Promise.all([productPromise, productsPromise ])
           .then(([product, products]) => {
           return res.render('products/productDetail', { product, products})
            })
            .catch((error) => res.send(error));
},

    addForm:(req,res)=> {
        // READ
        // accion necesaria para ver el formulario
        res.render("products/editProducts");
    },

    create:(req,res)=> {
        // CREATE

        let data = {
            name: req.body.name,
            category_id: req.body.type,
            care_level: req.body.careLevel,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            dicount_id: null,
            label: req.body.label,
            img: "/img/plantas/" + req.file.filename,
            discount_id : null
        }
        db.Product.create(data)
            .then(() => {
                res.redirect("/products");
            })
            .catch(error => {
                res.send(error);
            });
    },
    
    editForm: (req, res) => {
        // READ

        db.Product.findByPk(req.params.id).then((product) => {
          return res.render("products/editProducts", { editProduct: product });
        });
      },
      edit: (req, res) => {
        let id = req.params.id;
        let productType = 0;
        let productImage = "/img/plantas/Aglaonema.png";
        req.body.type == "Planta Floral" ? (productType = 1) : "";
        req.body.type == "Aromatica" ? (productType = 2) : "";
        req.body.type == "Arbusto" ? (productType = 3) : "";
        req.body.type == "Suculenta" ? (productType = 4) : "";
        req.body.type == "Frutal" ? (productType = 5) : "";
        if (req.file) {
          productImage = "/img/plantas/" + req.file.filename;
        }
        db.Product.update(
          {
            name: req.body.name,
            type: productType,
            careLevel: req.body.careLevel,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            label: req.body.label,
            img: productImage,
          },
          {
            where: {
              id: id,
            },
          }
        ).then((product) => {
          return res.redirect("/products/edit/" + id);
        });
        
      },
    delete:(req,res)=> {
        // DELETE

        db.Product.destroy({
            where: {id: req.params.id}
        }).then(() => {
            res.redirect("/products");
        }).catch(error => {
            res.send(error);
        });
    }
    
}


module.exports = controller