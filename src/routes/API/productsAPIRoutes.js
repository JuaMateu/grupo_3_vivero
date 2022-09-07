const express = require("express");
const router = express.Router();

// Controlador
const productAPIController = require("../../controllers/API/productAPIController");

// Listado De Productos
router.get("/:id", productAPIController.list);
router.get("/checkout", productAPIController.checkout);

module.exports = router;
