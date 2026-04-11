import {
	checkLinkExists,
	createLink,
	getLinkStats,
	getUserLinks,
} from '@/controllers/links.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getUserLinks);
router.post('/', createLink);
router.get('/:slug', checkLinkExists);
router.get('/:slug/stats', getLinkStats);

export default router;
