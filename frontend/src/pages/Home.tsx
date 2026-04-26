import ShortenForm from '../components/home/HomeShortenForm';
import StatsBar from '../components/home/HomeStatsBar';
import MainLayout from '../layouts/MainLayout';

export default function HomePage() {
	return (
		<MainLayout>
			<div className="flex flex-col items-center justify-center min-h-full text-center w-full">
				<h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-tight m-0 mb-4">
					Короткие ссылки.
					<br />
					<span className="text-muted">Умная аналитика.</span>
				</h1>
				<p className="text-base text-muted leading-relaxed m-0 mb-12 max-w-xl">
					Сокращайте ссылки и отслеживайте каждый переход — браузер, ОС, регион и время.
				</p>
				<ShortenForm />
				<StatsBar />
			</div>
		</MainLayout>
	);
}
