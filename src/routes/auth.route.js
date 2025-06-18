const router = require('express').Router()
const UserController = require('../controllers/User.controller')
const {validateAccess} = require('../validators/user.validator')
const {validateRequest} = require('../middlewares/validateRequest');

router.use(validateAccess)
router.use(validateRequest)

router.post('/users', UserController.register);
router.post('/login', UserController.login)

module.exports = router