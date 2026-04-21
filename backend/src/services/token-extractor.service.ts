import { env } from '@/config/env';
import { AppError } from '@/utils/AppError';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

type TokenPayload = { userId: number };

export const extractTokenPayload = (req: Request): TokenPayload => {
	const token = req.cookies?.['token'];

	if (!token) {
		throw new AppError(StatusCodes.UNAUTHORIZED, 'NO_TOKEN', 'Not authenticated');
	}

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);

		if (typeof decoded === 'string') {
			throw new Error();
		}

		return decoded as TokenPayload;
	} catch {
		throw new AppError(StatusCodes.UNAUTHORIZED, 'INVALID_TOKEN', 'Invalid or expired token');
	}
};

export const getOptionalUserId = (req: Request): number | null => {
	try {
		const token = req.cookies?.['token'];
		if (!token) return null;

		const decoded = jwt.verify(token, env.JWT_SECRET);
		if (typeof decoded === 'string') return null;

		return (decoded as TokenPayload).userId;
	} catch {
		return null;
	}
};
