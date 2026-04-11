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
					height: 1,
					background: '#1f1f1f',
				}}
			/>
			<span style={{ fontSize: 12, color: '#444' }}>или</span>
			<div
				style={{
					flex: 1,
					height: 1,
					background: '#1f1f1f',
				}}
			/>
		</div>
	);
}
