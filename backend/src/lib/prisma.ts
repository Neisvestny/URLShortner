import { env } from '@/config/env';
import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = new PrismaClient();

if (!env.IS_PROD) {
	globalForPrisma.prisma = prisma;
}

if (!env.IS_PROD) {
	prisma.$on('query' as never, (e: any) => {
		logger.debug(
			{
				query: e.query,
				params: e.params,
				duration: e.duration,
			},
			'prisma query',
		);
	});
}
