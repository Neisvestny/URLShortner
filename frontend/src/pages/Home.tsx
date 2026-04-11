import MainLayout from '../layouts/MainLayout';

import ShortenForm from '../components/home/HomeShortenForm';
import StatsBar from '../components/home/HomeStatsBar';

export default function HomePage() {
	return (
		<MainLayout>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100%', // ключ — не 100vh, а адаптивно
					textAlign: 'center',
					width: '100%',
				}}
			>
				<h1
					style={{
						fontSize: 'clamp(36px, 6vw, 64px)',
						fontWeight: 500,
						letterSpacing: '-2px',
						lineHeight: 1.05,
						margin: '0 0 16px',
					}}
				>
					Короткие ссылки.
					<br />
					<span style={{ color: '#888' }}>Умная аналитика.</span>
				</h1>

				<p
					style={{
						fontSize: 16,
						color: '#888',
						lineHeight: 1.6,
						margin: '0 0 48px',
						maxWidth: 600,
					}}
				>
					Сокращайте ссылки и отслеживайте каждый переход — браузер,
					ОС, регион и время.
				</p>

				<ShortenForm />
				<StatsBar />
			</div>
		</MainLayout>
	);
}
