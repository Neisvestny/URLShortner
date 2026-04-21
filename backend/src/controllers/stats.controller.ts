import { getGlobalStatsData } from '@/services/stats.service';
import { Request, Response } from 'express';

export const getGlobalStats = async (_req: Request, res: Response) => {
	const stats = await getGlobalStatsData();
	res.json(stats);
};
