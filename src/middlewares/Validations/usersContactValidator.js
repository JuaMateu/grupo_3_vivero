const { body } = require('express-validator');

const validations = [
    body('street')
        .trim()
        .notEmpty().withMessage("Debes agregar el nombre de la calle").bail()
        .isLength({min:3, max:30}).withMessage("Debes ingresar entre 3 y 30 caracteres"),
    body('number')
        .trim()
        .notEmpty().withMessage("debes ingresar la altura").bail()
        .isNumeric().withMessage("debes ingresar solo numeros")
        .isLength({min:0, max:8}).withMessage("no puede tener mas de 8 caracteres"),
    body('state')
        .trim()
        .notEmpty().withMessage("Debes agregar el nombre de la calle").bail()
        .isLength({min:3, max:30}).withMessage("Debes ingresar entre 3 y 30 caracteres"),
    body('city')
        .trim()
        .notEmpty().withMessage("Debes agregar el nombre de la calle").bail()
        .isLength({min:3, max:30}).withMessage("Debes ingresar entre 3 y 30 caracteres"),
    body('postal_code')
        .trim()
        .notEmpty().withMessage("debes ingresar el codigo postal").bail()
        .isNumeric().withMessage("debes ingresar solo numeros")
        .isLength({min:0, max:8}).withMessage("no puede tener mas de 8 caracteres"),


];

module.exports = validations;