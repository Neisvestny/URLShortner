import { pool } from '@/db';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UAParser } from 'ua-parser-js';

export const redirectBySlug = async (req: Request, res: Response) => {
	const { slug } = req.params;

	const result = await pool.query(
		`SELECT id, original_url FROM links WHERE slug = $1`,
		[slug],
	);

	if (result.rows.length === 0) {
		throw new AppError(
			StatusCodes.NOT_FOUND,
			'NOT_FOUND',
			'Link not found',
		);
	}

	const link = result.rows[0];

	const parser = new UAParser(req.headers['user-agent'] ?? '');
	const ua = parser.getResult();

	// Получаем IP в любом случае
	const rawIp =
		(req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
		req.socket.remoteAddress ??
		req.connection.remoteAddress ??
		(req.headers['x-real-ip'] as string) ??
		'unknown';

	const ip = rawIp.replace(/^::ffff:/, '');

	(async () => {
		let country: string | null = null;
		let region: string | null = null;

		// Пытаемся получить геолокацию только для внешних IP
		if (ip && ip !== 'unknown' && ip !== '127.0.0.1' && ip !== '::1') {
			try {
				const geo = await fetch(
					`http://ip-api.com/json/${ip}?fields=country,regionName`,
				);
				const geoData = (await geo.json()) as {
					country?: string;
					regionName?: string;
				};
				country = geoData.country ?? null;
				region = geoData.regionName ?? null;
			} catch {
				// геолокация упала — ничего страшного
			}
		}

		await pool.query(
			`INSERT INTO visits (link_id, ip, browser, browser_version, os, country, region, visited_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
			[
				link.id,
				ip,
				ua.browser.name ?? null,
				ua.browser.version ?? null,
				ua.os.name ?? null,
				country,
				region,
			],
		);
	})().catch(() => {});

	res.redirect(301, link.original_url);
};
