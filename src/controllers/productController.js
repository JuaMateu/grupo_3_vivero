const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const db = require("../database/models");

const productsFilePath = path.join(__dirname, "../data/productsDB.json");
var products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  shop: (req, res) => {
    // READ
    db.Product.findAll().then((products) => {
      res.render("products/shop", { products });
    });
  },
  list: (req, res) => {
    // READ
    db.Product.findAll().then((products) => {
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
    // READ
    // accion necesaria para ver el formulario
    res.render("products/addProducts");
  },

  create: (req, res) => {
    // CREATE
    // recibir formulario crear producto
    // buscamos el maximo id en la base de datos
    /* let newId = 1
        if (products.length != 0) {
           
            const ids = products.map(prod => {
            return prod.id;
            });

            newId = Math.max(...ids)+1;

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

        fs.writeFileSync(productsFilePath, productsExport, 'utf-8');

        res.redirect("/products/"); */
    console.log(req.body.type);
    let flowerType = 0;
    if (req.body.type == "Planta Floral") {
      flowerType = 1;
    } else if (req.body.type == "Aromatica") {
      flowerType = 2;
    } else if (req.body.type == "Arbusto") {
      flowerType = 3;
    } else if (req.body.type == "Suculenta") {
      flowerType = 4;
    } else if (req.body.type == "Frutal") {
      flowerType = 5;
    }
    console.log("aqui vamos");
    console.log(flowerType);
    db.Product.create({
      name: req.body.name,
      category_id: flowerType,
      care_level: req.body.careLevel,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      label: req.body.label,
      img: "/img/plantas/" + req.file.filename,
    });
  },

  editForm: (req, res) => {
    // READ
    // recibimos el id del producto a editar
    // filtramos el producto con el id indicado
    // usamos destructuring para obtener el objeto relativo al producto
    // let [editProduct] = products.filter((prod) => {
    //  return prod.id == req.params.id;
    // });
    // renderizamos la vista con el elemento correpondiente
    // res.render("../views/products/editProducts.ejs", {
    //  editProduct: editProduct,
    //});

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

    /*
    // UPDATE
    // Obtenemos el producto a editar segun el id recibido
    let [editProduct] = products.filter((prod) => {
      return prod.id == req.params.id;
    });
    // editamos el producto con los datos entrantes
    editProduct.name = req.body.name;
    editProduct.type = req.body.type;
    editProduct.careLevel = req.body.careLevel;
    editProduct.description = req.body.description;
    editProduct.stock = req.body.stock;
    editProduct.price = req.body.price;
    editProduct.label = req.body.label;
    //validar si cargaron imagen y cambiarla, si no no hacer nada
    if (req.file) {
      editProduct.img = "/img/plantas/" + req.file.filename;
    }
    editProduct.sells = 0;
    // sobreescribimos el JSON
    let productsExport = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, productsExport, "utf-8");
    // redirigimos a la lista de productos
    res.redirect("/products/edit/" + req.params.id);
    */
  },
  delete: (req, res) => {
    // DELETE
    // solcitamos el id y con filter, pedimos devolver todos los elementos cuyo id sea distinto al entrante
    products = products.filter((product) => {
      return product.id != req.params.id;
    });
    // sobreescribimos el JSON
    let productsExport = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, productsExport, "utf-8");
    // redirigimos a la lista de productos
    res.redirect("/products/");
  },
};
//para escribir un dato en el archivo copiar este codigo
// products.push(newProduct)
//  let productsExport = JSON.stringify(products, null, 2);
//  fs.writeFileSync(productsFilePath, productsExport);

module.exports = controller;
