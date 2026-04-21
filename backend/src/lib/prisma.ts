import { env } from '@/config/env';
import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = new PrismaClient();

if (env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}

if (env.NODE_ENV === 'development') {
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
