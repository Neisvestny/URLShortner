export default function VisitBar({
	visits,
	max,
}: {
	visits: number;
	max: number;
}) {
	const pct = Math.round((visits / max) * 100);
	return (
		<div
			style={{
				height: 3,
				borderRadius: 99,
				background: 'rgba(255,255,255,0.07)',
				overflow: 'hidden',
				marginTop: 12,
			}}
		>
			<div
				style={{
					height: '100%',
					width: `${pct}%`,
					borderRadius: 99,
					background: 'linear-gradient(90deg, #7c7cff, #b48cff)',
					transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
				}}
			/>
		</div>
	);
}
