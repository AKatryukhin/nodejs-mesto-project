import { Router } from 'express';
import usersRouter from './users';
import cardsRouter from './cards';
import { createUser, login } from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.post('/signin', login);

router.post('/signup', createUser);

router.use('/users', auth, usersRouter);

router.use('/cards', auth, cardsRouter);

export default router;
