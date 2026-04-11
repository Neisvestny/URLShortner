import { env } from '@/config/env';
import { logger } from '@/lib/logger';
import { Pool } from 'pg';

export const pool = new Pool({
	host: env.DB_HOST,
	port: Number(env.DB_PORT),
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
});

export async function connectDB() {
	try {
		const client = await pool.connect();
		await client.query('SELECT 1');
		client.release();

		logger.info('PostgreSQL connected');
	} catch (error) {
		logger.error({ error }, 'PostgreSQL connection failed');
		process.exit(1);
	}
}
