import { prisma } from '@/lib/prisma';
import { extractIp, extractUaData, recordVisit } from '@/services/visit.service';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const redirectBySlug = async (req: Request, res: Response) => {
	const slug = req.params['slug'];

	if (!slug || typeof slug !== 'string') {
		throw new AppError(StatusCodes.BAD_REQUEST, 'BAD_REQUEST', 'slug is required');
	}

	const link = await prisma.link.findUnique({
		where: { slug },
		select: { id: true, original_url: true },
	});

	if (!link) {
		throw new AppError(StatusCodes.NOT_FOUND, 'NOT_FOUND', 'Link not found');
	}

	const ip = extractIp(req);
	const ua = extractUaData(req);

	void recordVisit(link.id, ip, ua).catch(() => {});

	res.redirect(301, link.original_url);
};
