export default function StatCard({
	title,
	children,
	style,
}: {
	title: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}) {
	return (
		<div
			style={{
				padding: '20px 22px',
				borderRadius: 14,
				background: 'var(--surface)',
				border: '0.5px solid var(--border)',
				flex: 1,
				minWidth: 0,
				...style,
			}}
		>
			<p
				style={{
					margin: '0 0 16px',
					fontSize: 11,
					color: 'var(--muted)',
					textTransform: 'uppercase',
					letterSpacing: '0.06em',
				}}
			>
				{title}
			</p>
			{children}
		</div>
	);
}
