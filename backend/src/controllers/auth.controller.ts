import { authenticateUser, validateTokenAndGetUser } from '@/services/auth.service';
import { COOKIE_OPTIONS, signToken } from '@/services/token.service';
import { createUser } from '@/services/user.service';
import { validateLoginInput, validateRegistrationInput } from '@/services/validation.service';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body as {
		email?: string;
		password?: string;
	};

	validateLoginInput(email, password);

	const { user, token } = await authenticateUser(email!, password!);

	res.cookie('token', token, COOKIE_OPTIONS);
	res.json({ user });
};

export const registerUser = async (req: Request, res: Response) => {
	const { username, email, password } = req.body as {
		username?: string;
		email?: string;
		password?: string;
	};

	validateRegistrationInput(username, email, password);

	const user = await createUser(username!, email!, password!);
	const token = signToken({ userId: user.id });

	res.cookie('token', token, COOKIE_OPTIONS);
	res.status(StatusCodes.CREATED).json({ user });
};

export const getMe = async (req: Request, res: Response) => {
	const token = req.cookies?.['token'];

	if (!token) {
		throw new AppError(StatusCodes.UNAUTHORIZED, 'NO_TOKEN', 'Not authenticated');
	}

	const user = await validateTokenAndGetUser(token);
	res.json({ user });
};

export const logoutUser = (_req: Request, res: Response) => {
	res.clearCookie('token', COOKIE_OPTIONS);
	res.json({ success: true });
};
