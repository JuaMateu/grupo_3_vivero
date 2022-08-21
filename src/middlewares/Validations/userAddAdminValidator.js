const { body } = require('express-validator');
const moment = require('moment');
let now = moment();
actualDate = now.format("YYYY-MM-DD");

const validations = [
    body('firstName')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer nombre").bail()
        .isLength({min:2, max:20}).withMessage("Debes ingresar entre 2 y 20 caracteres"),
    body('lastName')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu primer apellido").bail()
        .isLength({min:2, max:20}).withMessage("Debes ingresar entre 2 y 20 caracteres"),
    body('email')
        .notEmpty().withMessage("Debes de ingresar tu email").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo electrónico válido"),
    body('password')
        .trim()
        .notEmpty().withMessage("Debes de ingresar una contraseña").bail()
        .isStrongPassword().withMessage("Tu contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo"),
    body('mobile')
        .trim()
        .notEmpty().withMessage("Debes de ingresar un número de teléfono").bail()
        .isMobilePhone().withMessage("Tu número de teléfono debe ser válido"),
    body('birth')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu fecha de nacimiento").bail()
        .isISO8601().withMessage("Debes ingresar una fecha con formato valido").bail()
        .isAfter("1900-1-1").withMessage("La fecha debe ser posterior a 1900").bail()
        .isBefore(actualDate).withMessage("La fecha debe ser anterior a 2018").bail()
];

module.exports = validations;