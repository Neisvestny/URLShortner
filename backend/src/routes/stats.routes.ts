import { getGlobalStats } from '@/controllers/stats.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getGlobalStats);

export default router;
