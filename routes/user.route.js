import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, getUserByID, postUser, putUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserByID);

router.post(
  '/',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('username', 'The name is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').not().isEmpty(),
    check('address', 'The address is mandatory').not().isEmpty(),
    check('phone', 'The phone is mandatory').not().isEmpty(),
    check('website', 'The website is mandatory').not().isEmpty(),
    check('company', 'The company is mandatory').not().isEmpty(),
  ],
  postUser
);

router.put('/:id', putUser);
router.delete('/:id', deleteUser);

export default router;
