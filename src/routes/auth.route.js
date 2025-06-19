import express from 'express';
const router = express.Router();
import AuthController from '../controllers/Auth.controller.js';
import {validateAccess} from '../validators/auth.validator.js';
import {validateRequest} from '../middlewares/validateRequest.js';

router.use(validateAccess)
router.use(validateRequest)

router.post('/register', AuthController.register);
router.post('/login', AuthController.login)

export default router;