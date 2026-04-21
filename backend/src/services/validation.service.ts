import { AppError } from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const validateLoginInput = (email?: string, password?: string) => {
	if (!email || !password) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			'VALIDATION_ERROR',
			'Email and password are required',
		);
	}
};

export const validateRegistrationInput = (username?: string, email?: string, password?: string) => {
	if (!username || !email || !password) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			'VALIDATION_ERROR',
			'Username, email and password are required',
		);
	}
};
