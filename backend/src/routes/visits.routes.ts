import { redirectBySlug } from '@/controllers/visits.controller';
import { Router } from 'express';

const router = Router();

router.get('/:slug', redirectBySlug);

export default router;
