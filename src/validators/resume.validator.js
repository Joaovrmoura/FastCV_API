import { body } from 'express-validator';

/**
 * Middleware of validation resume inputs.
 * Validate if inputs returns correts types.
 * @returns {ValidationChain[]} Array.
*/

export const valdateResumeInputs = [

  // get and validate mongo_id, for associate an user 
  body('user_id')
   .optional()
   .isMongoId()
   .withMessage('User deve ser um ID Mongo válido'),


  body('template_selected')
    .exists({ checkFalsy: true })
    .withMessage('O template é obrigatório')
    .isIn(['moderno', 'classico', 'clean', 'colorido', 'corporativo'])
    .withMessage('Template inválido'),


  body('personal_data.name')
    .optional()
    .isString()
    .isLength({ max: 255 })
    .withMessage('Nome é muito curto ou longo demais'),

  body('personal_data.location')
    .optional()
    .isString()
    .isLength({ max: 255 }),

  body('personal_data.phone')
    .optional()
    .isString()
    .isLength({ max: 20 }),

  body('personal_data.email')
    .optional()
    .isEmail()
    .withMessage('E-mail inválido'),

  body('personal_data.github')
    .optional()
    .isString()
    .isLength({max: 50})
    .withMessage('Entrada inválida!'),

  body('personal_data.linkedin')
    .optional()
    .isString()
    .isLength({max: 100})
    .withMessage('Entrada inválida!'),

  body('objective')
    .optional()
    .isString()
    .isLength({  max: 700 })
    .withMessage('Objetivo deve ter entre 10 e 500 caracteres'),





  body('education').optional().isArray(), 
  body('education.*.course')
    .optional()
    .isString()
    .isLength({ max: 50 }),
  body('education.*.institution')
    .optional()
    .isString()
    .isLength({ max: 100 }),
  body('education.*.location')
    .optional()
    .isString()
    .isLength({  max: 100 }),
  body('education.*.start_data')
    .optional()
    .isString()
    .isLength({ max: 21 }),
  body('education.*.end_data')
    .optional()
    .isString()
    .isLength({ max: 21 }),
 


  body('technical_skills').optional()
    .isArray().withMessage('technical_skills deve ser um array'),

  body('technical_skills.*.name').optional()
    .isString().withMessage('Cada categoria deve ter um nome')
    .isLength({ max: 30 }),

  body('technical_skills.*.skills').optional()
    .isArray().withMessage('Cada categoria deve ter um array de skills'),

  body('technical_skills.*.skills.*').optional()
    .isString().withMessage('Cada skill deve ser uma string')
    .isLength({  max: 30 }),




  body('professional_experience').optional().isArray(),
  body('professional_experience.*.name')
    .optional()
    .isString()
    .isLength({ max: 150 }),

  body('professional_experience.*.period').optional().isArray(),
  body('professional_experience.*.period.*')
    .optional()
    .isString()
    .isLength({ max: 50 }),

  body('professional_experience.*.github')
    .optional()
    .isString()
    .isLength({ max: 100})
    .withMessage('Entrada inválida!'),

  body('professional_experience.*.description')
    .optional()
    .isString()
    .isLength({  max: 500 }),

  body('professional_experience.*.details').optional().isArray(),
  body('professional_experience.*.details.*')
    .optional()
    .isString()
    .isLength({ max: 200 }),





  body('additional_courses').optional().isArray(),
  body('additional_courses.*.name')
    .optional()
    .isString()
    .isLength({ max: 50 }),

  body('additional_courses.*.platform')
    .optional()
    .isString()
    .isLength({ max: 70 }),

  body('additional_courses.*.duration')
    .optional()
    .isString()
    .isLength({ max: 30 }),


    

  body('languages').optional().isArray(),
  body('languages.*.name')
    .optional()
    .isString()
    .isLength({ max: 25 }),

  body('languages.*.level')
    .optional()
    .isString()
    .withMessage('Level deve ser basico, intermediario ou avancado'),
];
