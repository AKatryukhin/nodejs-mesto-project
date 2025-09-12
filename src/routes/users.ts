import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:userId', getUserById);

export default router;
