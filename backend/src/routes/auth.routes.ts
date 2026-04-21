import { getMe, loginUser, logoutUser, registerUser } from '@/controllers/auth.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/me', authMiddleware, getMe);

export default router;
