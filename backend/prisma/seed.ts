import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

function randomItem<T>(arr: T[]): T {
	if (arr.length === 0) {
		throw new Error('Array is empty');
	}
	return arr[Math.floor(Math.random() * arr.length)]!;
}

async function main() {
	console.log('🌱 Seeding database...');

	// Очищаем существующие данные
	await prisma.visit.deleteMany();
	await prisma.link.deleteMany();
	await prisma.user.deleteMany();

	// Создаем пользователей
	const users = await Promise.all([
		prisma.user.create({
			data: {
				username: 'alice',
				email: 'alice@example.com',
				password_hash: await bcrypt.hash('password123', 10),
			},
		}),
		prisma.user.create({
			data: {
				username: 'bob',
				email: 'bob@example.com',
				password_hash: await bcrypt.hash('password123', 10),
			},
		}),
	]);

	console.log(`✅ Created ${users.length} users`);

	// Создаем ссылки для каждого пользователя
	const linksData = [
		{ original_url: 'https://github.com' },
		{ original_url: 'https://stackoverflow.com' },
		{ original_url: 'https://medium.com' },
		{ original_url: 'https://dev.to' },
		{ original_url: 'https://youtube.com' },
	];

	const links = [];
	for (const user of users) {
		for (const linkData of linksData.slice(0, 3)) {
			const link = await prisma.link.create({
				data: {
					original_url: linkData.original_url,
					slug: nanoid(6),
					user_id: user.id,
				},
			});
			links.push(link);
		}
	}

	console.log(`✅ Created ${links.length} links`);

	// Создаем визиты для ссылок
	const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
	const oss = ['Windows', 'macOS', 'Linux', 'iOS', 'Android'];
	const countries = ['US', 'GB', 'DE', 'FR', 'CA', 'AU', 'JP', 'BR'];

	for (const link of links) {
		const visitsCount = Math.floor(Math.random() * 50) + 5; // 5-55 визитов

		for (let i = 0; i < visitsCount; i++) {
			const daysAgo = Math.floor(Math.random() * 30); // последние 30 дней
			const visitedAt = new Date();
			visitedAt.setDate(visitedAt.getDate() - daysAgo);

			await prisma.visit.create({
				data: {
					link_id: link.id,
					ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
					browser_version: `${Math.floor(Math.random() * 100)}.0`,
					browser: randomItem(browsers),
					os: randomItem(oss),
					country: randomItem(countries),
					region: `Region_${Math.floor(Math.random() * 10)}`,
					visited_at: visitedAt,
				},
			});
		}
	}

	console.log(`✅ Created visits for all links`);

	// Создаем публичные ссылки (без привязки к пользователю)
	const publicLinks = await Promise.all([
		prisma.link.create({
			data: {
				original_url: 'https://news.ycombinator.com',
				slug: nanoid(6),
				user_id: null,
			},
		}),
		prisma.link.create({
			data: {
				original_url: 'https://reddit.com',
				slug: nanoid(6),
				user_id: null,
			},
		}),
	]);

	console.log(`✅ Created ${publicLinks.length} public links`);

	console.log('🎉 Seeding completed!');
}

main()
	.catch((e) => {
		console.error('❌ Seeding failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
