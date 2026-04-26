type Props = { totalLinks: number; totalVisits: number; topSlug: string };

export default function StatsSummary({ totalLinks, totalVisits, topSlug }: Props) {
	const items = [
		{ label: 'Ссылок', value: totalLinks },
		{ label: 'Всего переходов', value: totalVisits.toLocaleString('ru') },
		{ label: 'Топ ссылка', value: `/${topSlug}` },
	];

	return (
		<div className="flex gap-3 flex-wrap mb-7">
			{items.map((s) => (
				<div
					key={s.label}
					className="px-4 py-2 rounded-lg bg-surface border border-border text-sm text-muted flex gap-2 items-center"
				>
					<span>{s.label}</span>
					<span className="text-fg font-medium">{s.value}</span>
				</div>
			))}
		</div>
	);
}
