import { useState, type ReactNode } from 'react';

type NavLinkProps = {
	children: ReactNode;
	onClick?: () => void;
};

export default function NavLink({ children, onClick }: NavLinkProps) {
	const [hovered, setHovered] = useState(false);
	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				fontSize: 13,
				color: hovered ? 'var(--fg)' : 'var(--muted)',
				padding: '6px 12px',
				borderRadius: 7,
				cursor: 'pointer',
				border: 'none',
				background: hovered ? 'var(--surface)' : 'transparent',
				transition: 'all 0.15s',
				fontFamily: 'inherit',
			}}
		>
			{children}
		</button>
	);
}
