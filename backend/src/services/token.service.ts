import { env } from '@/config/env';
import jwt from 'jsonwebtoken';
import { type StringValue } from 'ms';

export type TokenPayload = {
	userId: number;
};

export const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: env.IS_PROD,
	sameSite: 'lax' as const,
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signToken = (payload: TokenPayload): string => {
	return jwt.sign(payload, env.JWT_SECRET, {
		expiresIn: env.JWT_EXPIRES_IN as StringValue,
	});
};

export const verifyToken = (token: string): TokenPayload => {
	const decoded = jwt.verify(token, env.JWT_SECRET);

	if (typeof decoded === 'string') {
		throw new Error('Invalid token payload');
	}

	return decoded as TokenPayload;
};
