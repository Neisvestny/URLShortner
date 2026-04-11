import { pool } from '@/db';
import { Request, Response } from 'express';

export const getGlobalStats = async (_req: Request, res: Response) => {
	const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM links)::int AS total_links,
      (SELECT COUNT(*) FROM visits)::int AS total_visits,
      (SELECT COUNT(DISTINCT country) FROM visits WHERE country IS NOT NULL)::int AS total_countries
  `);

	res.json(result.rows[0]);
};
