import { Router } from 'express';
import routerUsers from './users';
import cardsRouter from './cards';

const router = Router();

router.use('/users', routerUsers);

router.use('/cards', cardsRouter);

export default router;
