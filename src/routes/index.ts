import { Router } from 'express';
import routerUsers from './users';

const router = Router();

router.use('/users', routerUsers);

// router.use('/cards', );

export default router;
