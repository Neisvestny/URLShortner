import { AppError } from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { signToken, TokenPayload, verifyToken } from './token.service';
import { findUserByEmail, findUserById, verifyPassword } from './user.service';

export const authenticateUser = async (email: string, password: string) => {
	const user = await findUserByEmail(email);

	if (!user) {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'INVALID_CREDENTIALS',
			'Invalid email or password',
		);
	}

	const isMatch = await verifyPassword(password, user.password_hash);

	if (!isMatch) {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'INVALID_CREDENTIALS',
			'Invalid email or password',
		);
	}

	const token = signToken({ userId: user.id });

	return {
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
		},
		token,
	};
};

export const validateTokenAndGetUser = async (token: string) => {
	let payload: TokenPayload;

	try {
		payload = verifyToken(token);
	} catch {
		throw new AppError(StatusCodes.UNAUTHORIZED, 'INVALID_TOKEN', 'Invalid or expired token');
	}

	const user = await findUserById(payload.userId);

	if (!user) {
		throw new AppError(StatusCodes.UNAUTHORIZED, 'USER_NOT_FOUND', 'User not found');
	}

	return user;
};
