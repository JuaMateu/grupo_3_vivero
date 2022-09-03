const { body } = require('express-validator');

const validations = [
    body('name')
        .trim()
        .notEmpty().withMessage("Debes ingresar un nombre para el producto").bail()
        .isLength({min:3, max:40}).withMessage("Debes ingresar el entre 3 y 40 caracteres"),
    body('description')
        .trim()
        .isLength({max:300}).withMessage("la descripcion no puede superar los 300 caracteres"),
    body("category_id")
        .notEmpty().withMessage("Debes de ingresar la categoría del producto").bail()
        .isNumeric().withMessage("el id de categoría debe ser numerico"),
    body('care_level')
        .trim()
        .notEmpty().withMessage("Debes de ingresar el nivel de cuidados"),
    body('stock')
        .trim()
        .notEmpty().withMessage("debes ingresar la cantidad en stock").bail()
        .isNumeric().withMessage("el stock debe ser numerico"),
    body("price")
        .trim()
        .notEmpty().withMessage("debes ingresar la cantidad en stock").bail()
        .isNumeric().withMessage("el stock debe ser numerico"),
    body('label')
        .trim()
        .notEmpty().withMessage("debes seleccionar una etiqueta").bail()
        .isLength({min:3, max:40}).withMessage("la etiqueta debe tener entre 3 y 40 caracteres")
];

module.exports = validations;