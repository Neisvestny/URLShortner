import { env } from '@/config/env';
import jwt from 'jsonwebtoken';

export type TokenPayload = {
	userId: number;
};

const isProd = env.NODE_ENV === 'production';

export const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: isProd,
	sameSite: 'lax' as const,
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signToken = (payload: TokenPayload): string => {
	return jwt.sign(payload, env.JWT_SECRET, {
		expiresIn: '7d',
	});
};

export const verifyToken = (token: string): TokenPayload => {
	const decoded = jwt.verify(token, env.JWT_SECRET);

	if (typeof decoded === 'string') {
		throw new Error('Invalid token payload');
	}

	return decoded as TokenPayload;
};
