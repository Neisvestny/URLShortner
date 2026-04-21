import { validateTokenAndGetUser } from '@/services/auth.service';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: number;
				username: string;
				email: string;
			};
		}
	}
}

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
	try {
		const token = req.cookies?.['token'];

		if (!token) {
			throw new AppError(StatusCodes.UNAUTHORIZED, 'NO_TOKEN', 'Not authenticated');
		}

		const user = await validateTokenAndGetUser(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
