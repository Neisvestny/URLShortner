export default function MiniBar({
	label,
	n,
	max,
	color,
}: {
	label: string;
	n: number;
	max: number;
	color: string;
}) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 10,
				marginBottom: 8,
			}}
		>
			<span
				style={{
					fontSize: 12,
					color: "#888",
					width: 80,
					flexShrink: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{label}
			</span>
			<div
				style={{
					flex: 1,
					height: 4,
					borderRadius: 99,
					background: "rgba(255,255,255,0.06)",
				}}
			>
				<div
					style={{
						height: "100%",
						width: `${(n / max) * 100}%`,
						borderRadius: 99,
						background: color,
						transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
					}}
				/>
			</div>
			<span
				style={{
					fontSize: 12,
					color: "#555",
					width: 24,
					textAlign: "right",
					flexShrink: 0,
				}}
			>
				{n}
			</span>
		</div>
	);
}
