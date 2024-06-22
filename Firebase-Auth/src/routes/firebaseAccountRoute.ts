import { Router } from 'express';
import { FirebaseAccountController } from '../controller/firebaseAccountController';
import { verifyToken } from '../middlewares/firebaseMiddleware';

const router = Router();

router.post(
  '/accounts',
  FirebaseAccountController.createAccount
);
router.post('/login',FirebaseAccountController.login);
router.get('/accounts', verifyToken, FirebaseAccountController.getAccount)

export default router;