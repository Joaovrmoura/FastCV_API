const router = require('express').Router();
const {create} = require('../controllers/Resume.controller')
const {valdateResumeInputs} = require('../validators/resume.validator')
const {validateRequest} = require('../middlewares/validateRequest')

router.use(valdateResumeInputs, validateRequest)
router.post('/resumes', create)

module.exports = router
