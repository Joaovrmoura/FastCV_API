import express from 'express';
const router = express.Router();
import UserController from '../controllers/User.controller.js';
import loginRequired from '../middlewares/tokenRequired.js';
import roleRequired from '../middlewares/roleRequired.js';

router.use(loginRequired);
router.get('/users/:id', UserController.findOne);
router.get('/users', roleRequired(['admin']), UserController.findAll);
router.delete('/users/:id', roleRequired(['admin']), UserController.remove);

export default router;
