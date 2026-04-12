export default function LogoIcon() {
	return (
		<div
			style={{
				width: 22,
				height: 22,
				flexShrink: 0,
				background: 'var(--logo-bg)',
				borderRadius: 5,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<svg
				width="13"
				height="13"
				viewBox="0 0 13 13"
				fill="var(--logo-fg)"
			>
				<path d="M2 11L6.5 2L11 11H2Z" />
			</svg>
		</div>
	);
}
