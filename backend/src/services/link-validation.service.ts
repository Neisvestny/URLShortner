// services/link-validation.service.ts
import { AppError } from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const validateOriginalUrl = (original_url?: string) => {
	if (!original_url) {
		throw new AppError(StatusCodes.BAD_REQUEST, 'MISSING_URL', 'original_url is required');
	}
};

export const validateSlug = (slug?: string) => {
	if (!slug) {
		throw new AppError(StatusCodes.BAD_REQUEST, 'BAD_REQUEST', 'slug is required');
	}
};

export const validateSlugFormat = (slug?: string) => {
	if (!slug || slug.length !== 6) {
		throw new AppError(StatusCodes.BAD_REQUEST, 'INVALID_SLUG', 'Invalid slug');
	}
};

export const validateLinkExists = async (linkExists: { id: number | string } | null) => {
	if (!linkExists) {
		throw new AppError(StatusCodes.NOT_FOUND, 'NOT_FOUND', 'Link not found');
	}
};
