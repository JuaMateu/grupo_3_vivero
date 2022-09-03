const { body } = require('express-validator');
const { locales } = require('moment/moment');

const validations = [
    body('street')
        .trim()
        .notEmpty().withMessage("Debes agregar el nombre de la calle").bail()
        .isLength({min:3, max:30}).withMessage("Debes ingresar entre 3 y 30 caracteres"),
    body('number')
        .trim()
        .notEmpty().withMessage("Debes ingresar el número de la calle").bail()
        .isNumeric().withMessage("Debes ingresar solo numeros")
        .isLength({min:0, max:8}).withMessage("No puede tener mas de 8 caracteres"),
    body('state')
        .trim()
        .notEmpty().withMessage("Debes agregar el estado donde vivís").bail()
        .isAlpha("es-ES",{ignore:" "}).withMessage("Debes ingresar palabras únicamente").bail() //Para casos de provincias separadas por un espacio en blanco
        .isLength({min:3, max:45}).withMessage("Debes ingresar entre 3 y 45 caracteres"),
    body('city')
        .trim()
        .notEmpty().withMessage("Debes agregar la ciudad donde vivís").bail()
        .isAlpha("es-ES",{ignore:" "}).withMessage("Debes ingresar palabras únicamente").bail()
        .isLength({min:3, max:45}).withMessage("Debes ingresar entre 3 y 45 caracteres"),
    body('postal_code')
        .trim()
        .notEmpty().withMessage("Debes ingresar el codigo postal donde vivís").bail()
        .isNumeric().withMessage("Debes ingresar solo numeros")
        .isLength({min:0, max:8}).withMessage("No puede tener mas de 8 caracteres"),
    body('mobile')
        .trim()
        .notEmpty().withMessage("Debes ingresar tu número de teléfono").bail()
        .isNumeric().withMessage("Debes ingresar solo numeros").bail()
        .isLength({min:10,max:10}).withMessage("Debe haber exactamente 10 números")
];

module.exports = validations;