export default function StatCard({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div
			style={{
				padding: "20px 22px",
				borderRadius: 14,
				background: "rgba(255,255,255,0.03)",
				border: "1px solid rgba(255,255,255,0.07)",
				flex: 1,
				minWidth: 0,
			}}
		>
			<p
				style={{
					margin: "0 0 16px",
					fontSize: 11,
					color: "#555",
					textTransform: "uppercase",
					letterSpacing: "0.06em",
				}}
			>
				{title}
			</p>
			{children}
		</div>
	);
}
