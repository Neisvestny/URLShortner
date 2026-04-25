import 'dotenv/config';
import { env } from '@/config/env';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './../../generated/prisma/client';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
	connectionString: env.DATABASE_URL,
});

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
	});

if (!env.IS_PROD) {
	globalForPrisma.prisma = prisma;

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
