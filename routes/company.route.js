import { Router } from 'express';
import { check } from 'express-validator';

import {
  getCompanies,
  getCompanyByID,
  postCompany,
  putCompany,
  deleteCompany,
} from '../controllers/company.controller';

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompanyByID);

router.post(
  '/',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('catchPhrase', 'The catch phrase is mandatory').not().isEmpty(),
    check('bs', 'The BS is mandatory').not().isEmpty(),
  ],
  postCompany
);

router.put('/:id', putCompany);
router.delete('/:id', deleteCompany);

export default router;
