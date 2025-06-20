import {validationResult} from  'express-validator';

// get erros array from express-validator and passed for json response
export const validateRequest = (req, res, next) => {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
        return res.status(400).json({"success": false, "message": erros.array()})
    }
    next();
};

