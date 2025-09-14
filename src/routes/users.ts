import { Router } from 'express';
import {
  getUserById,
  getUserProfile,
  getUsers,
  updateAvatar,
  updateUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getUserProfile);

router.get('/:userId', getUserById);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

export default router;
