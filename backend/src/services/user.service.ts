import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/AppError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

export const findUserByEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			username: true,
			email: true,
			password_hash: true,
		},
	});
};

export const findUserById = async (id: number) => {
	return prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			username: true,
			email: true,
		},
	});
};

export const createUser = async (username: string, email: string, password: string) => {
	const passwordHash = await bcrypt.hash(password, 10);

	try {
		return await prisma.user.create({
			data: {
				username,
				email,
				password_hash: passwordHash,
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});
	} catch (error) {
		// P2002 - Prisma unique constraint violation
		if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
			const target = error.meta?.['target'] as string[] | undefined;

			if (target?.includes('email')) {
				throw new AppError(
					StatusCodes.CONFLICT,
					'EMAIL_ALREADY_EXISTS',
					'User with this email already exists',
				);
			}

			if (target?.includes('username')) {
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

export const verifyPassword = async (
	plainPassword: string,
	hashedPassword: string,
): Promise<boolean> => {
	return bcrypt.compare(plainPassword, hashedPassword);
};
