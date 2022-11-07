var express = require('express');
const orderController = require('../controllers/orderController');
var router = express.Router();
let loggedMiddleware = require('../middlewares/loggedMiddleware');
/* Main routes */

router.get('/',orderController.index);
router.get("/detail/:id", orderController.detail);
router.get("/finished", orderController.finished);
router.get("/detail/process/:id", orderController.inProcess);
router.put("/detail/process/:id", orderController.processed);


module.exports = router;