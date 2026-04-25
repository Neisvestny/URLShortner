import {
	validateOriginalUrl,
	validateSlug,
	validateSlugFormat,
} from '@/services/link-validation.service';
import {
	createLinkRecord,
	findLinkBySlug,
	formatLinkStats,
	getLinkBySlugAndUser,
	getLinksByUserId,
} from '@/services/link.service';
import { extractTokenPayload, getOptionalUserId } from '@/services/token-extractor.service';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getUserLinks = async (req: Request, res: Response) => {
	const { userId } = extractTokenPayload(req);
	const links = await getLinksByUserId(userId);
	res.json({ links });
};

export const createLink = async (req: Request, res: Response) => {
	const userId = getOptionalUserId(req);
	const original_url: string | undefined = req.body?.original_url;

	validateOriginalUrl(original_url);

	const link = await createLinkRecord(original_url, userId);
	res.status(StatusCodes.CREATED).json({ link });
};

export const getLinkStats = async (req: Request<{ slug: string }>, res: Response) => {
	const slug = req.params.slug;
	const { userId } = extractTokenPayload(req);

	validateSlug(slug);

	const link = await getLinkBySlugAndUser(slug!, userId);

	if (!link) {
		throw new AppError(StatusCodes.NOT_FOUND, 'NOT_FOUND', 'Link not found');
	}

	const formattedStats = formatLinkStats(link);
	res.json(formattedStats);
};

export const checkLinkExists = async (req: Request<{ slug: string }>, res: Response) => {
	const slug = req.params.slug;

	validateSlugFormat(slug);

	const linkExists = await findLinkBySlug(slug!);

	if (!linkExists) {
		throw new AppError(StatusCodes.NOT_FOUND, 'NOT_FOUND', 'Link not found');
	}

	res.sendStatus(StatusCodes.NO_CONTENT);
};
