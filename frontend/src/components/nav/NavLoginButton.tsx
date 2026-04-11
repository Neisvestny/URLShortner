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
				color: '#ededed',
				background: hovered ? '#222' : '#1a1a1a',
				border: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)'}`,
				borderRadius: 7,
				padding: '6px 14px',
				cursor: 'pointer',
				transition: 'all 0.15s',
				fontFamily: 'inherit',
			}}
		>
			Войти
		</button>
	);
}
