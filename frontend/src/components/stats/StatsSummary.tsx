type Props = {
	totalLinks: number;
	totalVisits: number;
	topSlug: string;
};

export default function StatsSummary({
	totalLinks,
	totalVisits,
	topSlug,
}: Props) {
	const items = [
		{ label: "Ссылок", value: totalLinks },
		{ label: "Всего переходов", value: totalVisits.toLocaleString("ru") },
		{ label: "Топ ссылка", value: `/${topSlug}` },
	];

	return (
		<div
			style={{
				display: "flex",
				gap: 12,
				flexWrap: "wrap",
				marginBottom: 28,
			}}
		>
			{items.map((s) => (
				<div
					key={s.label}
					style={{
						padding: "8px 16px",
						borderRadius: 10,
						background: "rgba(255,255,255,0.04)",
						border: "1px solid rgba(255,255,255,0.07)",
						fontSize: 13,
						color: "#888",
						display: "flex",
						gap: 8,
						alignItems: "center",
					}}
				>
					<span>{s.label}</span>
					<span
						style={{
							color: "#ededed",
							fontWeight: 500,
						}}
					>
						{s.value}
					</span>
				</div>
			))}
		</div>
	);
}
