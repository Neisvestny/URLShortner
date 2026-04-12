import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginButton() {
	const [hovered, setHovered] = useState(false);
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate('/login')}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				fontSize: 13,
				height: 32,
				padding: '0 14px',
				color: 'var(--fg)',
				background: hovered ? 'var(--surface-hover)' : 'var(--surface)',
				border: `0.5px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
				borderRadius: 7,
				cursor: 'pointer',
				transition: 'all 0.15s',
				fontFamily: 'inherit',
				fontWeight: 450,
				letterSpacing: '-0.1px',
			}}
		>
			Войти
		</button>
	);
}
