const { body, query } = require('express-validator')

/**
 * Middleware of validation for login and register.
 * Validate if e-mail and password has minimal size.
 * @returns {ValidationChain[]} Array.
*/

const validateAccess = [
    body('email')
    .isString()
    .isLength({min: 10, max:255})
    .withMessage('Enter a valid password')
    .isEmail().withMessage('Email inválido'),

    body('password').isLength({min: 6, max: 100})
    .withMessage('Senha deve ter entre 6 e 100 caracteres')
]

module.exports = {
    validateAccess
}