import { useEffect } from 'react';
import { selectIsAuthenticated, selectUser } from '../features/auth/selectors';
import { selectTheme } from '../features/theme/themeSelectors';
import { useAppSelector } from '../hooks/storeHooks';
import Navbar from './Navbar';

type Props = {
	children: React.ReactNode;
};
export default function MainLayout({ children }: Props) {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);

	const theme = useAppSelector(selectTheme);

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				background: 'var(--bg)',
				color: 'var(--fg)',
				fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
			}}
		>
			<Navbar isAuthenticated={isAuthenticated} user={user} />

			<main
				style={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center',
					padding: '80px 24px 60px',
				}}
			>
				<div
					style={{
						width: '100%',
						maxWidth: 1200,
					}}
				>
					{children}
				</div>
			</main>
		</div>
	);
}
