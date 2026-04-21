import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UAParser } from 'ua-parser-js';

export const redirectBySlug = async (req: Request, res: Response) => {
	const slug = req.params['slug'];

	if (!slug || typeof slug !== 'string') {
		throw new AppError(StatusCodes.BAD_REQUEST, 'BAD_REQUEST', 'slug is required');
	}

	const link = await prisma.link.findUnique({
		where: { slug },
		select: { id: true, original_url: true },
	});

	if (!link) {
		throw new AppError(StatusCodes.NOT_FOUND, 'NOT_FOUND', 'Link not found');
	}

	const parser = new UAParser(req.headers['user-agent'] ?? '');
	const ua = parser.getResult();

	const forwarded = req.headers['x-forwarded-for'];
	const realIp = req.headers['x-real-ip'];

	let rawIp: string | undefined;

	if (typeof forwarded === 'string') {
		rawIp = forwarded.split(',')[0]?.trim();
	} else if (typeof realIp === 'string') {
		rawIp = realIp;
	} else {
		rawIp = req.socket.remoteAddress ?? req.connection.remoteAddress ?? undefined;
	}

	const ip = rawIp?.replace(/^::ffff:/, '') ?? 'unknown';

	void (async () => {
		let country: string | null = null;
		let region: string | null = null;

		if (ip !== 'unknown' && ip !== '127.0.0.1' && ip !== '::1') {
			try {
				const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName`);

				if (geo.ok) {
					const geoData: {
						country?: string;
						regionName?: string;
					} = await geo.json();

					country = geoData.country ?? null;
					region = geoData.regionName ?? null;
				}
			} catch {
				// ignore
			}
		}

		await prisma.visit.create({
			data: {
				link_id: link.id,
				ip,
				browser: ua.browser.name ?? null,
				browser_version: ua.browser.version ?? null,
				os: ua.os.name ?? null,
				country,
				region,
			},
		});
	})().catch(() => {});

	res.redirect(301, link.original_url);
};
