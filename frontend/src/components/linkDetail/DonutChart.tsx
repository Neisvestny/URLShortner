type Props = {
	data: { key: string; n: number }[];
	colors: Record<string, string>;
};

export default function DonutChart({ data, colors }: Props) {
	const total = data.reduce((s, d) => s + d.n, 0);
	const size = 88;
	const r = 30;
	const cx = size / 2,
		cy = size / 2;
	const circ = 2 * Math.PI * r;

	return (
		<div className="flex items-center gap-4">
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
				<circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={10} />
				{data.map((d, i) => {
					const dash = (d.n / total) * circ;
					const offset = data
						.slice(0, i)
						.reduce((acc, curr) => acc + (curr.n / total) * circ, 0);
					return (
						<circle
							key={d.key}
							cx={cx}
							cy={cy}
							r={r}
							fill="none"
							stroke={colors[d.key] ?? '#444'}
							strokeWidth={10}
							strokeDasharray={`${dash} ${circ - dash}`}
							strokeDashoffset={-offset}
							style={{
								transform: 'rotate(-90deg)',
								transformOrigin: 'center',
								transition: 'stroke-dasharray 0.5s',
							}}
						/>
					);
				})}
				<text
					x={cx}
					y={cy + 1}
					textAnchor="middle"
					dominantBaseline="middle"
					fill="var(--fg)"
					fontSize={13}
					fontWeight={500}
				>
					{total}
				</text>
			</svg>
			<div className="flex-1">
				{data.slice(0, 4).map((d) => (
					<div key={d.key} className="flex items-center gap-1.5 mb-1.5">
						<span
							className="size-[7px] rounded-full shrink-0"
							style={{ background: colors[d.key] ?? '#444' }}
						/>
						<span className="text-xs text-muted flex-1">{d.key}</span>
						<span className="text-xs text-muted opacity-60">
							{Math.round((d.n / total) * 100)}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
