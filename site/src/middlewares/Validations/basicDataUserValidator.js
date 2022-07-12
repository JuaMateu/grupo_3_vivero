const { body } = require('express-validator');

const validations = [
    body('firstName')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer nombre").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body('lastName')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer apellido").bail()
        .isLength({min:3, max:20}).withMessage("Debes ingresar entre 3 y 20 caracteres"),
    body('birth')
        .notEmpty().withMessage("Debes de ingresar tu fecha de nacimiento").bail()
        .isISO8601().withMessage("Debes ingresar una fecha con formato valido").bail()
        .isAfter('birth',[1950-1-1]).withMessage("La fecha debe ser posterior a 1900").bail()
        .isBefore('birth',[2018-1-1]).withMessage("La fecha debe ser anterior a 2018").bail()
];

module.exports = validations;