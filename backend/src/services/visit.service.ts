import { prisma } from '@/lib/prisma';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';

export const extractIp = (req: Request): string => {
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

	return rawIp?.replace(/^::ffff:/, '') ?? 'unknown';
};

export const fetchGeoData = async (
	ip: string,
): Promise<{ country: string | null; region: string | null }> => {
	if (ip === 'unknown' || ip === '127.0.0.1' || ip === '::1') {
		return { country: null, region: null };
	}

	try {
		const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName`);

		if (!geo.ok) return { country: null, region: null };

		const geoData: { country?: string; regionName?: string } = await geo.json();

		return {
			country: geoData.country ?? null,
			region: geoData.regionName ?? null,
		};
	} catch {
		return { country: null, region: null };
	}
};

export const extractUaData = (req: Request) => {
	const parser = new UAParser(req.headers['user-agent'] ?? '');
	const ua = parser.getResult();

	return {
		browser: ua.browser.name ?? null,
		browser_version: ua.browser.version ?? null,
		os: ua.os.name ?? null,
	};
};

export const recordVisit = async (
	linkId: number,
	ip: string,
	ua: ReturnType<typeof extractUaData>,
) => {
	const { country, region } = await fetchGeoData(ip);

	await prisma.visit.create({
		data: {
			link_id: linkId,
			ip,
			...ua,
			country,
			region,
		},
	});
};
