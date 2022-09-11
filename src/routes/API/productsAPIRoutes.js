const express = require("express");
const router = express.Router();

// Controlador
const productAPIController = require("../../controllers/API/productAPIController");

// Listado De Productos
router.get("/:id", productAPIController.detail);
router.post("/purchase", productAPIController.purchase);

module.exports = router;
