import { Router } from 'express';
import { check } from 'express-validator';

import {
  getAddresses,
  getAddressByID,
  postAddress,
  putAddress,
  deleteAddress,
} from '../controllers/address.controller';

const router = Router();

router.get('/', getAddresses);
router.get('/:id', getAddressByID);

router.post(
  '/',
  [
    check('street', 'The street is mandatory').not().isEmpty(),
    check('suite', 'The suite phrase is mandatory').not().isEmpty(),
    check('city', 'The city is mandatory').not().isEmpty(),
    check('zipCode', 'The zip code is mandatory').not().isEmpty(),
  ],
  postAddress
);

router.put('/:id', putAddress);
router.delete('/:id', deleteAddress);

export default router;
