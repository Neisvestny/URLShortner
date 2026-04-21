import { prisma } from '@/lib/prisma';

export interface GlobalStats {
	total_links: number;
	total_visits: number;
	total_countries: number;
}

export const getGlobalStatsData = async (): Promise<GlobalStats> => {
	const [totalLinks, totalVisits, uniqueCountries] = await Promise.all([
		prisma.link.count(),
		prisma.visit.count(),
		prisma.visit.groupBy({
			by: ['country'],
			where: { country: { not: null } },
		}),
	]);

	return {
		total_links: totalLinks,
		total_visits: totalVisits,
		total_countries: uniqueCountries.length,
	};
};
