import { Moon, Sun } from 'lucide-react';
import { selectTheme } from '../../features/theme/themeSelectors';
import { toggleTheme } from '../../features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';

export default function NavThemeButton() {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(selectTheme);

	return (
		<button
			onClick={() => dispatch(toggleTheme())}
			title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
			style={{
				width: 32,
				height: 32,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'none',
				border: '0.5px solid var(--border)',
				borderRadius: 7,
				color: 'var(--muted)',
				cursor: 'pointer',
				flexShrink: 0,
				transition: 'border-color 0.15s, color 0.15s',
				fontFamily: 'inherit',
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = 'var(--border-hover)';
				e.currentTarget.style.color = 'var(--fg)';
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor = 'var(--border)';
				e.currentTarget.style.color = 'var(--muted)';
			}}
		>
			{theme === 'dark' ? (
				<Sun size={15} strokeWidth={1.8} />
			) : (
				<Moon size={15} strokeWidth={1.8} />
			)}
		</button>
	);
}
