const { body } = require('express-validator');

const validations = [
    body('actualPass')
        .trim()
        .notEmpty().withMessage("Debes de ingresar tu contraseña").bail(),
    body('newPass')
        .trim()
        .notEmpty().withMessage("Debes de ingresar una contraseña").bail(),
    body('newPassCheck')
        .trim()
        .notEmpty().withMessage("Debes de ingresar una contraseña").bail()
        .custom((value, {req}) => {
            if (value !== req.body.newPass) {
                // Mensaje en caso de no coincidir
                throw new Error("Las contraseñas no coinciden");
            } 
            return true;
        }),
];

module.exports = validations;
