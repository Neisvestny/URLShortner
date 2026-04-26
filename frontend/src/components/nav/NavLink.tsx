import { type ReactNode } from 'react';

type Props = { children: ReactNode; onClick?: () => void };

export default function NavLink({ children, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className="text-sm text-muted px-3 py-1.5 rounded-md cursor-pointer border-none bg-transparent transition-colors font-sans hover:text-fg hover:bg-surface"
		>
			{children}
		</button>
	);
}
