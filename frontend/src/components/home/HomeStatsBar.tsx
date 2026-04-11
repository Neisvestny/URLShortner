import { useGlobalStats } from '../../hooks/useGlobalStats';

function formatNum(n: number): string {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
	return String(n);
}

export default function StatsBar() {
	const stats = useGlobalStats();

	const items = [
		{
			num: stats ? formatNum(stats.total_links) : '—',
			desc: 'ссылок создано',
		},
		{ num: stats ? formatNum(stats.total_visits) : '—', desc: 'переходов' },
		{ num: stats ? `${stats.total_countries}+` : '—', desc: 'стран' },
	];

	return (
		<div
			style={{
				display: 'flex',
				gap: 48,
				marginTop: 64,
				paddingTop: 48,
				borderTop: '1px solid rgba(255,255,255,0.08)',
			}}
		>
			{items.map(({ num, desc }) => (
				<div key={desc}>
					<div
						style={{
							fontSize: 28,
							fontWeight: 500,
							letterSpacing: '-1px',
						}}
					>
						{num}
					</div>
					<div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
						{desc}
					</div>
				</div>
			))}
		</div>
	);
}
