export default function AuthSeparator() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 12,
				margin: '24px 0',
			}}
		>
			<div
				style={{
					flex: 1,
					height: '0.5px',
					background: 'var(--border)',
				}}
			/>
			<span style={{ fontSize: 12, color: 'var(--muted)', opacity: 0.6 }}>или</span>
			<div
				style={{
					flex: 1,
					height: '0.5px',
					background: 'var(--border)',
				}}
			/>
		</div>
	);
}
