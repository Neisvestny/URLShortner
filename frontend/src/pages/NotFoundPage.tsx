import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#0a0a0a',
				color: '#ededed',
				fontFamily: "'Geist', 'Inter', sans-serif",
				gap: 16,
			}}
		>
			<p
				style={{
					fontSize: 11,
					color: '#555',
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					margin: 0,
				}}
			>
				404
			</p>
			<h1
				style={{
					fontSize: 'clamp(28px, 5vw, 42px)',
					fontWeight: 500,
					letterSpacing: '-1.5px',
					margin: 0,
				}}
			>
				Страница не найдена.
			</h1>
			<p style={{ fontSize: 14, color: '#555', margin: 0 }}>
				Такой страницы не существует или она была удалена.
			</p>
			<button
				onClick={() => navigate('/')}
				style={{
					marginTop: 8,
					padding: '10px 20px',
					background: '#ededed',
					color: '#0a0a0a',
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
