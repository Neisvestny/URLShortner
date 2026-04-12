import { Router } from 'express';
import authRoutes from './auth.routes';
import linksRoutes from './links.routes';
import statsRoutes from './stats.routes';
import visitsRoutes from './visits.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/links', linksRoutes);
router.use('/stats', statsRoutes);
router.use('/r', visitsRoutes);

export default router;
