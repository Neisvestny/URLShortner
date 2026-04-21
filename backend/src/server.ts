import { env } from '@/config/env';
import { connectDB } from '@/db';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

async function startServer() {
	await connectDB();

	const server = app.listen(env.PORT, () => {
		if (env.NODE_ENV === 'development') {
			logger.info(`Server started on http://${env.HOST}:${env.PORT}`);
			logger.info(`Prisma Studio: npx prisma studio`);
		} else {
			logger.info({ port: env.PORT }, 'server started');
		}
	});

	const shutdown = async () => {
		logger.info('Shutting down...');

		server.close(async () => {
			await prisma.$disconnect();
			logger.info('Server & DB closed');
			process.exit(0);
		});
	};

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
}

startServer();
