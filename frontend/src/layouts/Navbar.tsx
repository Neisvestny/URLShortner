import { Link } from 'react-router-dom';
import LoginButton from '../components/nav/NavLoginButton';
import LogoIcon from '../components/nav/NavLogoIcon';
import NavThemeButton from '../components/nav/NavThemeButton';
import UserBadge from '../components/nav/NavUserBadge';
import type { User } from '../types/user';

type NavbarProps = {
	isAuthenticated: boolean;
	user?: User | null;
};

export default function Navbar({ isAuthenticated, user }: NavbarProps) {
	return (
		<nav
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '0 32px',
				height: 56,
				borderBottom: '0.5px solid var(--border)',
				position: 'sticky',
				top: 0,
				background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
				backdropFilter: 'blur(12px)',
				WebkitBackdropFilter: 'blur(12px)',
				zIndex: 10,
				transition: 'background 0.2s, border-color 0.2s',
			}}
		>
			{/* Логотип */}
			<Link
				to="/"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					fontSize: 15,
					fontWeight: 500,
					letterSpacing: '-0.3px',
					textDecoration: 'none',
					color: 'inherit',
				}}
			>
				<LogoIcon />
				URL Shortner
			</Link>

			{/* Ссылки */}
			<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
				<NavThemeButton />

				{/* разделитель */}
				<div
					style={{
						width: '0.5px',
						height: 18,
						background: 'var(--border)',
						flexShrink: 0,
					}}
				/>

				{isAuthenticated ? <UserBadge username={user?.username} /> : <LoginButton />}
			</div>
		</nav>
	);
}
