import dotenv from 'dotenv';
dotenv.config();

import { env } from '@/config/env';
import { connectDB, pool } from '@/db';
import { logger } from '@/lib/logger';
import app from './app';

async function startServer() {
	await connectDB();

	const server = app.listen(env.PORT, () => {
		if (env.NODE_ENV === 'development') {
			logger.info(`Server started on http://${env.HOST}:${env.PORT}`);
		} else {
			logger.info({ port: env.PORT }, 'server started');
		}
	});

	const shutdown = async () => {
		logger.info('Shutting down...');

		server.close(async () => {
			await pool.end();
			logger.info('Server & DB closed');
			process.exit(0);
		});
	};

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
}

startServer();
