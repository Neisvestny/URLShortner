import { Link } from 'react-router-dom';
import LoginButton from '../components/nav/NavLoginButton';
import LogoIcon from '../components/nav/NavLogoIcon';
import NavThemeButton from '../components/nav/NavThemeButton';
import UserBadge from '../components/nav/NavUserBadge';
import type { User } from '../types/user';

type Props = { isAuthenticated: boolean; user?: User | null };

export default function Navbar({ isAuthenticated, user }: Props) {
	return (
		<nav className="flex items-center justify-between px-8 h-14 border-b border-border sticky top-0 bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-md z-10 transition-colors">
			<Link
				to="/"
				className="flex items-center gap-2 text-sm font-medium no-underline text-fg"
			>
				<LogoIcon />
				URL Shortner
			</Link>
			<div className="flex items-center gap-1.5">
				<NavThemeButton />
				<div className="w-px h-4 bg-border shrink-0" />
				{isAuthenticated ? <UserBadge username={user?.username} /> : <LoginButton />}
			</div>
		</nav>
	);
}
