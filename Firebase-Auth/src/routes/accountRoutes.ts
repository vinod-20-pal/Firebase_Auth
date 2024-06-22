import { Router } from 'express';
import { AccountController } from '../controller/accountController';
import { check } from 'express-validator';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post(
  '/accounts',
  [
    check('first_name', 'First name is required').notEmpty(),
    check('last_name', 'Last name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('birthday', 'Birthday is required').isDate(),
  ],
  AccountController.createAccount
);
router.post('/login',AccountController.login);
router.get('/accounts/:limit', authMiddleware, AccountController.getAccounts);
router.patch('/accounts/:id',authMiddleware,AccountController.updateAccount);
router.delete('/accounts/:id',authMiddleware, AccountController.deleteAccount);

export default router;