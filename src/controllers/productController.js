const { response } = require("express");
const db = require("../database/models");
const { validationResult } = require("express-validator");

const controller = {
  shop: (req, res) => {
    // READ
    db.Product.findAll().then((products) => {
      res.render("products/shop", { products });
    });
  },
  list: (req, res) => {
    // READ
    db.Product.findAll({ include: ["category"] }).then((products) => {
      res.render("products/listProducts", { products });
    });
  },

  detail: (req, res) => {
    let productPromise = db.Product.findByPk(req.params.id);
    let productsPromise = db.Product.findAll();
    Promise.all([productPromise, productsPromise])
      .then(([product, products]) => {
        return res.render("products/productDetail", { product, products });
      })
      .catch((error) => res.send(error));
  },

  addForm: (req, res) => {
    // formulario de creacion de producto
    res.render("products/addProducts");
  },

  create: (req, res) => {
    //accion de crear producto
    const resultValidation = validationResult(req);
    //Validaciones de formulario
    if (resultValidation.errors.length > 0) {
      return res.render("products/addProducts", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // imagen por defecto
    let imgPath = "/img/plantas/Aglaonema.png";
    if (req.file) {
      imgPath = "/img/plantas/" + req.file.filename;
    }
    //objeto data para crear producto
    let data = {
      name: req.body.name,
      category_id: req.body.category_id,
      care_level: req.body.care_level,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      dicount_id: null,
      label: req.body.label,
      img: imgPath,
    };
    db.Product.create(data)
      .then(() => {
        res.redirect("/products");
      })
      .catch((error) => {
        res.send(error);
      });
  },

  editForm: (req, res) => {
    // READ
    db.Product.findByPk(req.params.id).then((product) => {
      return res.render("products/editProducts", { editProduct: product });
    });
  },
  edit: async (req, res) => {
    const resultValidation = validationResult(req);

    //Validaciones de formulario
    if (resultValidation.errors.length > 0) {
      let ProductData = await db.Product.findByPk(req.params.id)
      console.log(resultValidation.errors)
      return res.render("products/editProducts", {
        errors: resultValidation.mapped(),
        editProduct: ProductData ,
      });
    }
    let data = {
      name: req.body.name,
      category_id: req.body.category_id,
      care_level: req.body.care_level,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      label: req.body.label,
    };
    if (req.file) {
      data.img = "/img/plantas/" + req.file.filename;
    }

    console.log(`ALSKDMASLKDMALAKDSMKLASMDLKASMDALSKMDLAKSMLKSADMLKAMD${data.img}`)

    db.Product.update(data, { where: { id: req.params.id } }).then(
      (product) => {
        return res.redirect("/products/edit/" + req.params.id);
      }
    );
  },
  delete: (req, res) => {
    // DELETE

    db.Product.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.redirect("/products");
      })
      .catch((error) => {
        res.send(error);
      });
  },
};

module.exports = controller;
