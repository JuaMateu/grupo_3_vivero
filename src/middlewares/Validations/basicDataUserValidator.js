const { body } = require('express-validator');

// let actualDate = Date.now("%y-%m-%d");
const moment = require('moment');
let now = moment();
actualDate = now.format("YYYY-MM-DD")

const validations = [
    body('first_name')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer nombre").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body('last_name')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer apellido").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body("date_of_birth")
        .notEmpty().withMessage("Debes de ingresar tu fecha de nacimiento").bail()
        .isISO8601().withMessage("Debes ingresar una fecha con formato valido").bail()
        .isAfter("1900-1-1").withMessage("La fecha debe ser posterior a 1900").bail()
        .isBefore(actualDate).withMessage("La fecha debe ser anterior a 2018").bail()
];

module.exports = validations;