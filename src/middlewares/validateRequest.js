const {validationResult} = require('express-validator')

const validateRequest = (req, res, next) => {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
        return res.status(400).json({"success": false, "message": erros.array()})
    }
    next();
}

module.exports = {
    validateRequest
}