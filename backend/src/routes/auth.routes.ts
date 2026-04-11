import {
	getMe,
	loginUser,
	logoutUser,
	registerUser,
} from '@/controllers/auth.controller';
import { Router } from 'express';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', getMe);
router.post('/logout', logoutUser);

export default router;
