// requires
var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');
let guestMiddleware = require('../middlewares/guestMiddleware');
let loggedMiddleware = require('../middlewares/loggedMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');
//validaciones de formulario de Registro

const registerValidations = [
    body('userName').notEmpty().withMessage("Debes completar tu nombre"),
    body('userLastName').notEmpty().withMessage("Debes completar tu apellido"),
    body('userEmail').isEmail().withMessage("Debes ingresar un email válido"),
    body('userPassword').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('userTermsAccept').notEmpty().withMessage("Debes aceptar los términos y condiciones para continuar")
] ;

//validaciones de formulario de Login
const loginValidations = [
    body('email')
        .notEmpty().withMessage("* Por favor ingresa tu correo electrónico").bail()
        .isEmail().withMessage("* No es un formato de email válido"),
    body('password').notEmpty().withMessage("* Por favor ingresa tu contraseña")
]

//validaciones de formulario de Edit Usuario
const editValidations = [
    body('userName').notEmpty().withMessage("* Este campo no puede estar vacío"),
    body('userLastName').notEmpty().withMessage("* Este campo no puede estar vacío"),
    body('userEmail')
        .notEmpty().withMessage("* Este campo no puede estar vacío").bail()
        .isEmail().withMessage("* No es un formato de email válido")
]

// Routes
router.get('/',loggedMiddleware, adminMiddleware, userController.usuarios);
router.get('/perfil', loggedMiddleware, userController.perfil);
router.get('/login', guestMiddleware, userController.login);
router.post('/login', loginValidations, userController.logged);
router.get('/registro', userController.registro);
router.post('/registro',registerValidations , userController.store);
router.post('/logout', userController.logout);
router.get('/edit',loggedMiddleware, userController.edit)
router.post('/edit',loggedMiddleware, editValidations, userController.update)


// Module export
module.exports = router;
