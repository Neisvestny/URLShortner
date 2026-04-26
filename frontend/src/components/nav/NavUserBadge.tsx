import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { clearUser } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/storeHooks';

type Props = { username?: string };

export default function UserBadge({ username }: Props) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const initials = username ? username.slice(0, 2).toUpperCase() : '??';

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleLogout = async () => {
		await authApi.logout();
		dispatch(clearUser());
		navigate('/');
	};

	const menuItems = [
		{
			label: 'Статистика',
			onClick: () => {
				navigate('/stats');
				setOpen(false);
			},
		},
		{ label: 'Выйти', onClick: handleLogout, danger: true },
	];

	return (
		<div ref={ref} className="relative">
			<div
				onClick={() => setOpen((v) => !v)}
				className={`flex items-center gap-2 py-0.5 pr-2 pl-0.5 border rounded-full cursor-pointer transition-colors select-none ${
					open ? 'border-border-hover' : 'border-border'
				}`}
			>
				<div className="size-[26px] rounded-full bg-surface flex items-center justify-center text-[10px] font-medium text-fg tracking-wide shrink-0">
					{initials}
				</div>
				<span className="text-sm text-fg font-medium">{username}</span>
				<ChevronDown
					size={12}
					strokeWidth={2}
					className={`text-muted transition-transform duration-150 ${open ? 'rotate-180' : 'rotate-0'}`}
				/>
			</div>

			{open && (
				<div className="absolute top-[calc(100%+8px)] right-0 min-w-40 bg-surface border border-border rounded-lg p-1 z-50 shadow-lg">
					{menuItems.map(({ label, onClick, danger }) => (
						<button
							key={label}
							onClick={onClick}
							className={`block w-full px-3 py-2 bg-transparent border-none rounded-md text-left text-sm font-sans cursor-pointer transition-colors ${
								danger
									? 'text-danger hover:bg-danger-bg'
									: 'text-fg hover:bg-surface-hover'
							}`}
						>
							{label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
