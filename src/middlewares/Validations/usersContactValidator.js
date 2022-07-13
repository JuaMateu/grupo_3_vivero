const { body } = require('express-validator');

const validations = [
    body('address')
        .trim()
        .notEmpty().withMessage("Debes agregar tu direccion valida").bail()
        .isLength({min:3, max:30}).withMessage("Debes ingresar entre 3 y 30 caracteres"),
    body('mobile')
        .trim()
        .notEmpty().withMessage("debes ingresar un numero de telefono").bail()
        .isNumeric().withMessage("debes ingresar solo numeros")
        .isLength({min:8, max:12}).withMessage("Debes ingresar entre 8 y 12 caracteres")
];

module.exports = validations;