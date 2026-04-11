export default function LoadingDots() {
	const dotStyle = (delay: number) => ({
		width: 4,
		height: 4,
		background: '#0a0a0a',
		borderRadius: '50%',
		display: 'inline-block',
		animation: `bounce 0.9s ${delay}s infinite`,
	});
	return (
		<span
			style={{
				display: 'inline-flex',
				gap: 4,
				alignItems: 'center',
				height: 16,
			}}
		>
			<span style={dotStyle(0)} />
			<span style={dotStyle(0.15)} />
			<span style={dotStyle(0.3)} />
		</span>
	);
}
