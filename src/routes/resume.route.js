import express from 'express';
const router = express.Router();
import ResumeController from '../controllers/Resume.controller.js';
// validate data in params and body
import {valdateResumeInputs} from '../validators/resume.validator.js';
// transform erros in an array end show
import {validateRequest} from '../middlewares/validateRequest.js';
import requiredLogin from '../middlewares/tokenRequired.js';
import requiredRole from '../middlewares/roleRequired.js';

// token access required
router.use(requiredLogin)

// get All resumes
router.get('/resumes', 
    requiredRole(['admin']), 
    ResumeController.findAll
)

// get one
router.get('/resumes/:id', 
    ResumeController.findOne
)

// add resume
router.post('/resumes', 
    valdateResumeInputs, 
    validateRequest, 
    ResumeController.create
)

// update
router.put('/resumes/:id',
    valdateResumeInputs, 
    validateRequest, 
    ResumeController.update
)

// delete
router.delete('/resumes/:id', 
    requiredRole(['admin']), 
    ResumeController.remove
)

export default router;
