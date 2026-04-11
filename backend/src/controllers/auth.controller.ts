import { env } from '@/config/env';
import { pool } from '@/db';
import { AppError } from '@/utils/AppError';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const isProd = env.NODE_ENV === 'production';

const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: isProd,
	sameSite: 'lax' as const,
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const result = await pool.query('SELECT * FROM users WHERE email = $1', [
		email,
	]);

	if (result.rows.length === 0) {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'INVALID_CREDENTIALS',
			'Invalid email or password',
		);
	}

	const user = result.rows[0];

	const isMatch = await bcrypt.compare(password, user.password_hash);

	if (!isMatch) {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'INVALID_CREDENTIALS',
			'Invalid email or password',
		);
	}

	const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
		expiresIn: '7d',
	});

	res.cookie('token', token, COOKIE_OPTIONS);

	res.json({
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
		},
	});
};

export const registerUser = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			'VALIDATION_ERROR',
			'Username, email and password are required',
		);
	}

	try {
		// Хэшируем пароль
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		// Создаём пользователя
		const result = await pool.query(
			`INSERT INTO users (username, email, password_hash)
		 VALUES ($1, $2, $3)
		 RETURNING id, username, email`,
			[username, email, passwordHash],
		);

		const user = result.rows[0];

		// Генерируем JWT
		const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
			expiresIn: '7d',
		});

		res.cookie('token', token, COOKIE_OPTIONS);

		res.status(StatusCodes.CREATED).json({
			user,
		});
	} catch (error: any) {
		if (error.code === '23505') {
			// unique_violation
			if (error.constraint.includes('email')) {
				throw new AppError(
					StatusCodes.CONFLICT,
					'EMAIL_ALREADY_EXISTS',
					'User with this email already exists',
				);
			}

			if (error.constraint.includes('username')) {
				throw new AppError(
					StatusCodes.CONFLICT,
					'USERNAME_ALREADY_EXISTS',
					'User with this username already exists',
				);
			}
		}

		throw error;
	}
};

export const getMe = async (req: Request, res: Response) => {
	const token = req.cookies?.['token'];

	if (!token) {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'NO_TOKEN',
			'Not authenticated',
		);
	}

	let payload: { userId: number };

	try {
		payload = jwt.verify(token, env.JWT_SECRET) as { userId: number };
	} catch {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'INVALID_TOKEN',
			'Invalid or expired token',
		);
	}

	const result = await pool.query(
		'SELECT id, username, email FROM users WHERE id = $1',
		[payload.userId],
	);

	if (result.rows.length === 0) {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'USER_NOT_FOUND',
			'User not found',
		);
	}

	res.json({ user: result.rows[0] });
};

export const logoutUser = (_req: Request, res: Response) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: isProd,
		sameSite: 'lax',
	});
	res.json({ success: true });
};
