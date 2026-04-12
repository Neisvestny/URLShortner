import { useNavigate } from 'react-router-dom';

export default function LinkNotFoundPage() {
	const navigate = useNavigate();

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'var(--bg)',
				color: 'var(--fg)',
				fontFamily: "'Geist', 'Inter', sans-serif",
				gap: 16,
			}}
		>
			<p
				style={{
					fontSize: 11,
					color: 'var(--muted)',
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					margin: 0,
				}}
			>
				Ссылка не найдена
			</p>
			<h1
				style={{
					fontSize: 'clamp(28px, 5vw, 42px)',
					fontWeight: 500,
					letterSpacing: '-1.5px',
					margin: 0,
					color: 'var(--fg)',
				}}
			>
				Ссылка недействительна.
			</h1>
			<p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
				Возможно, она была удалена или никогда не существовала.
			</p>
			<button
				onClick={() => navigate('/')}
				style={{
					marginTop: 8,
					padding: '10px 20px',
					background: 'var(--fg)',
					color: 'var(--bg)',
					border: 'none',
					borderRadius: 8,
					fontSize: 13,
					fontWeight: 500,
					fontFamily: 'inherit',
					cursor: 'pointer',
				}}
			>
				На главную
			</button>
		</div>
	);
}
