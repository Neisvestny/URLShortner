import { useGlobalStats } from '../../hooks/useGlobalStats';

function formatNum(n: number) {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
	return String(n);
}

export default function StatsBar() {
	const stats = useGlobalStats();
	const items = [
		{ num: stats ? formatNum(stats.total_links) : '—', desc: 'ссылок создано' },
		{ num: stats ? formatNum(stats.total_visits) : '—', desc: 'переходов' },
		{ num: stats ? `${stats.total_countries}+` : '—', desc: 'стран' },
	];

	return (
		<div className="flex gap-12 mt-16 pt-12 border-t border-border">
			{items.map(({ num, desc }) => (
				<div key={desc}>
					<div className="text-3xl font-medium tracking-tight text-fg">{num}</div>
					<div className="text-xs text-muted mt-1">{desc}</div>
				</div>
			))}
		</div>
	);
}
