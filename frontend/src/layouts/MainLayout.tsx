import { useEffect } from 'react';
import { selectIsAuthenticated, selectUser } from '../features/auth/selectors';
import { selectTheme } from '../features/theme/themeSelectors';
import { useAppSelector } from '../hooks/storeHooks';
import Navbar from './Navbar';

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);
	const theme = useAppSelector(selectTheme);

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<div data-theme={theme} className="min-h-screen flex flex-col bg-bg text-fg font-sans">
			<Navbar isAuthenticated={isAuthenticated} user={user} />
			<main className="flex-1 flex justify-center px-6 py-20">
				<div className="w-full max-w-screen-xl">{children}</div>
			</main>
		</div>
	);
}
