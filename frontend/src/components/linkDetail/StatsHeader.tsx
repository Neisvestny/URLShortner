interface Props {
	code: string;
	total: number;
	originalUrl?: string;
}

export default function StatsHeader({ code, total, originalUrl }: Props) {
	return (
		<div style={{ marginBottom: 28 }}>
			<div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
				<h1
					style={{
						fontSize: 'clamp(24px, 4vw, 36px)',
						fontWeight: 500,
						letterSpacing: '-1px',
						margin: 0,
					}}
				>
					/{code}
				</h1>
				<span style={{ fontSize: 13, color: '#555' }}>
					{total} переходов
				</span>
			</div>
			{originalUrl && (
				<a
					href={originalUrl}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						fontSize: 13,
						color: '#555',
						textDecoration: 'none',
						marginTop: 4,
						display: 'block',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						maxWidth: 500,
					}}
					onMouseEnter={(e) => (e.currentTarget.style.color = '#888')}
					onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
				>
					{originalUrl}
				</a>
			)}
		</div>
	);
}
