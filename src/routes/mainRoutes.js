const express = require("express");
const router = express.Router();

// Controllers
const mainController = require("../controllers/mainController");

// Middlewares
const userNotLoggedMiddleware = require("../middlewares/userNotLoggedMiddleware");

router.get("/", mainController.home);
// router.get("/search", mainController.search);
router.get("/home", mainController.home);
router.get("/shopCart", userNotLoggedMiddleware, mainController.cart);
router.get("/about", mainController.about);
// router.get("/orderBy", mainController.orderBy);
// router.get('/shop', mainController.shop);
router.post("/", mainController.home);

module.exports = router;
