// Requires
const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/", apiController.index);
router.get("/usersCount", apiController.usersCount);
router.get("/lastUser", apiController.lastUser);
router.get('/productsCount',apiController.productsCount);
router.get('/lastProduct',apiController.lastProduct);
router.get('/users',apiController.users);
router.get('/products',apiController.products);
router.get('/categorias',apiController.categorias)
router.get('/product/:id',apiController.product)
router.get('/user/:id',apiController.user)
router.get('/prodXCat',apiController.prodXCat)

module.exports = router;
