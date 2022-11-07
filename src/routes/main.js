// Requires
var express = require('express');
const mainController = require('../controllers/mainController');
var router = express.Router();
// const multer = require ('multer');


/* Main routes */
router.get('/',mainController.index);

module.exports = router;
