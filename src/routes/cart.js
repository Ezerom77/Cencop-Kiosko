// Requires
var express = require('express');
const cartController = require('../controllers/cartController');
var router = express.Router();
// const multer = require ('multer');
let loggedMiddleware = require('../middlewares/loggedMiddleware');
/* Main routes */
router.get('/add/:id',loggedMiddleware,cartController.add);
router.post('/add/:id',loggedMiddleware,cartController.addQty);
router.get('/remove/:id',loggedMiddleware,cartController.remove);
router.get('/removeAll',loggedMiddleware,cartController.removeAll);
router.get('/checkout',loggedMiddleware,cartController.checkout);
router.get('/process',loggedMiddleware,cartController.process)
router.get('/end',loggedMiddleware,cartController.end)
router.get('/',loggedMiddleware,cartController.index);

router.post('/test',loggedMiddleware,cartController.test)

module.exports = router;
