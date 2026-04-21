import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

export const pool = prisma;

export async function connectDB() {
	try {
		await prisma.$connect();
		logger.info('PostgreSQL connected via Prisma');
	} catch (error) {
		logger.error({ error }, 'PostgreSQL connection failed');
		process.exit(1);
	}
}
