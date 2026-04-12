import { env } from '@/config/env';
import { pool } from '@/db';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

const getTokenPayload = (req: Request): { userId: string } => {
	const token = req.cookies?.['token'];
	if (!token) {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'NO_TOKEN',
			'Not authenticated',
		);
	}
	try {
		return jwt.verify(token, env.JWT_SECRET) as { userId: string };
	} catch {
		throw new AppError(
			StatusCodes.UNAUTHORIZED,
			'INVALID_TOKEN',
			'Invalid or expired token',
		);
	}
};

export const getUserLinks = async (req: Request, res: Response) => {
	const { userId } = getTokenPayload(req);

	const result = await pool.query(
		`SELECT
      l.id,
      l.slug,
      l.original_url,
      l.created_at,
      COUNT(v.id)::int AS visits,
      MAX(v.visited_at) AS last_visit
    FROM links l
    LEFT JOIN visits v ON v.link_id = l.id
    WHERE l.user_id = $1
    GROUP BY l.id
    ORDER BY visits DESC`,
		[userId],
	);

	res.json({ links: result.rows });
};

export const createLink = async (req: Request, res: Response) => {
	let userId: string | null = null;
	try {
		const token = req.cookies?.['token'];
		if (token) {
			const payload = jwt.verify(token, env.JWT_SECRET) as {
				userId: string;
			};
			userId = payload.userId;
		}
	} catch {
		// невалидный токен — просто игнорируем
	}

	const { original_url } = req.body;
	if (!original_url) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			'MISSING_URL',
			'original_url is required',
		);
	}

	const slug = nanoid(6);

	const result = await pool.query(
		`INSERT INTO links (slug, original_url, user_id)
     VALUES ($1, $2, $3)
     RETURNING id, slug, original_url, created_at`,
		[slug, original_url, userId], // userId может быть null
	);

	res.status(StatusCodes.CREATED).json({ link: result.rows[0] });
};

export const getLinkStats = async (req: Request, res: Response) => {
	const { userId } = getTokenPayload(req);
	const { slug } = req.params;

	// Проверяем что ссылка принадлежит этому юзеру
	const linkResult = await pool.query(
		`SELECT id, slug, original_url, created_at
     FROM links WHERE slug = $1 AND user_id = $2`,
		[slug, userId],
	);

	if (linkResult.rows.length === 0) {
		throw new AppError(
			StatusCodes.NOT_FOUND,
			'NOT_FOUND',
			'Link not found',
		);
	}

	const link = linkResult.rows[0];

	const visitsResult = await pool.query(
		`SELECT id, ip, browser, browser_version, os, country, region, visited_at
     FROM visits WHERE link_id = $1
     ORDER BY visited_at DESC`,
		[link.id],
	);

	res.json({ link, visits: visitsResult.rows });
};

export const checkLinkExists = async (req: Request, res: Response) => {
	const { slug } = req.params;

	if (!slug || slug.length !== 6) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			'INVALID_SLUG',
			'Invalid slug',
		);
	}

	const result = await pool.query(
		`SELECT 1 FROM links WHERE slug = $1 LIMIT 1`,
		[slug],
	);

	if (result.rows.length === 0) {
		throw new AppError(
			StatusCodes.NOT_FOUND,
			'NOT_FOUND',
			'Link not found',
		);
	}

	res.sendStatus(StatusCodes.NO_CONTENT); // 204
};
