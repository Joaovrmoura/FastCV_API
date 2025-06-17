const { body, query } = require('express-validator')

const validateAccess = [
    body('email')
    .isString()
    .isLength({min: 10, max:255})
    .withMessage('Enter a valid password')
    .isEmail().withMessage('Invalid email'),

    body('password').isLength({min: 6, max: 100})
]

module.exports = {
    validateAccess
}