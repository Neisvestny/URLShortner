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
			className="size-8 flex items-center justify-center bg-transparent border border-border rounded-md text-muted cursor-pointer transition-colors hover:border-border-hover hover:text-fg"
		>
			{theme === 'dark' ? (
				<Sun size={15} strokeWidth={1.8} />
			) : (
				<Moon size={15} strokeWidth={1.8} />
			)}
		</button>
	);
}
