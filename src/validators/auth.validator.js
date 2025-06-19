import { body } from 'express-validator';

/**
 * Middleware of validation for login and register.
 * Validate if e-mail and password has minimal size.
 * @returns {ValidationChain[]} Array.
*/

export const validateAccess = [
    body('email')
    .isString()
    .isLength({min: 10, max:255})
    .withMessage('Email inválido')
    .isEmail().withMessage('Email inválido'),

    body('password').isLength({min: 6, max: 100})
    .withMessage('Senha deve ter entre 6 e 100 caracteres')
]

