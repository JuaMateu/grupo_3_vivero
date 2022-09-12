const { response } = require("express");
const db = require("../database/models");
let Products = db.Product;
const { validationResult } = require("express-validator");

const controller = {
  shop: async (req, res) => {

    let search = "%";
    let atribute = "name";
    let order = "DESC";
    let careLvl = '%';
    let category = '%';
    let discount = '%';
    let productPage = 0
    let label = "%";

    req.query.page ? productPage = ( req.query.page -1 ) * 12 : "";
    req.query.searched ? search = req.query.searched : "";
    req.query.easyCare ? careLvl = req.query.easyCare : "";
    req.query.offer ? discount = req.query.offer : "";
    req.query.category ? category = req.query.category : "";
    req.query.label ? label = req.query.label : "";

    if (req.query.orderBy) {
      let orderBy = req.query.orderBy;

      switch (orderBy) {
        case "nameAsc":
          console.log("nombre ascendente");
          atribute = "name";
          order = "ASC";
          break;
        case "nameDesc":
          atribute = "name";
          order = "DESC";
          break;
        case "priceAsc":
          atribute = "price";
          order = "ASC";
          break;
        case "priceDesc":
          atribute = "price";
          order = "DESC";
          break;
        default:
          break;
      }
    }
    
    let { count, rows } = await Products.findAndCountAll({
      where: {
        name: { [db.Sequelize.Op.like]: `%${search}%` },
        care_level: {[db.Sequelize.Op.like]: `%${careLvl}%`},
        category_id: {[db.Sequelize.Op.like]: `%${category}%`},
        discount_id: {[db.Sequelize.Op.like]: `${discount}`},
        label: {[db.Sequelize.Op.like]: `${label}`},
      },
      order: [[atribute, order]],
      limit: 12,
      offset: productPage,
    });



    let pagesCant = Math.ceil( count / 12 );

    return res.render("products/shop", { products : rows , pagesCant });


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

  detail: async (req, res) => {
    let productPromise = db.Product.findByPk(req.params.id, { include: ["category"] });
    let productsPromise = db.Product.findAll({
      where: {
        label: "Mas Vendida",
      },
    });
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
      discount_id: req.body.discount_id,
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
