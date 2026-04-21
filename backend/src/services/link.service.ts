import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export const getLinksByUserId = async (userId: number) => {
	const links = await prisma.link.findMany({
		where: { user_id: userId },
		select: {
			id: true,
			slug: true,
			original_url: true,
			created_at: true,
			_count: {
				select: { visits: true },
			},
			visits: {
				select: { visited_at: true },
				orderBy: { visited_at: 'desc' },
				take: 1,
			},
		},
		orderBy: {
			visits: {
				_count: 'desc',
			},
		},
	});

	return links.map((link) => ({
		id: link.id,
		slug: link.slug,
		original_url: link.original_url,
		created_at: link.created_at,
		visits: link._count.visits,
		last_visit: link.visits[0]?.visited_at ?? null,
	}));
};

export const createLinkRecord = async (original_url: string, userId: number | null) => {
	const slug = nanoid(6);

	return prisma.link.create({
		data: {
			slug,
			original_url,
			user_id: userId,
		},
		select: {
			id: true,
			slug: true,
			original_url: true,
			created_at: true,
		},
	});
};

export const getLinkBySlugAndUser = async (slug: string, userId: number) => {
	return prisma.link.findFirst({
		where: {
			slug,
			user_id: userId,
		},
		select: {
			id: true,
			slug: true,
			original_url: true,
			created_at: true,
			_count: {
				select: { visits: true },
			},
			visits: {
				select: {
					id: true,
					ip: true,
					browser: true,
					browser_version: true,
					os: true,
					country: true,
					region: true,
					visited_at: true,
				},
				orderBy: {
					visited_at: 'desc',
				},
			},
		},
	});
};

export const findLinkBySlug = async (slug: string) => {
	return prisma.link.findUnique({
		where: { slug },
		select: { id: true },
	});
};

export const formatLinkStats = (link: Awaited<ReturnType<typeof getLinkBySlugAndUser>>) => {
	if (!link) return null;

	return {
		link: {
			id: link.id,
			slug: link.slug,
			original_url: link.original_url,
			created_at: link.created_at,
			visits_count: link._count.visits,
		},
		visits: link.visits,
	};
};
