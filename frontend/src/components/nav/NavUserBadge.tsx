import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { clearUser } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/storeHooks';

type UserBadgeProps = {
	username?: string;
};

export default function UserBadge({ username }: UserBadgeProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const initials = username ? username.slice(0, 2).toUpperCase() : '??';

	// Закрываем при клике вне
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
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
		{
			label: 'Выйти',
			onClick: handleLogout,
			danger: true,
		},
	];

	return (
		<div ref={ref} style={{ position: 'relative' }}>
			<div
				onClick={() => setOpen((v) => !v)}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					padding: '3px 8px 3px 3px',
					border: `0.5px solid ${open ? 'var(--border-hover)' : 'var(--border)'}`,
					borderRadius: 100,
					cursor: 'pointer',
					transition: 'border-color 0.15s',
					userSelect: 'none',
				}}
			>
				<div
					style={{
						width: 26,
						height: 26,
						borderRadius: '50%',
						background: 'var(--surface)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 10,
						fontWeight: 500,
						color: 'var(--fg)',
						letterSpacing: '0.3px',
						flexShrink: 0,
					}}
				>
					{initials}
				</div>
				<span
					style={{
						fontSize: 13,
						color: 'var(--fg)',
						fontWeight: 450,
					}}
				>
					{username}
				</span>
				<ChevronDown
					size={12}
					strokeWidth={2}
					style={{
						color: 'var(--muted)',
						transition: 'transform 0.15s',
						transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
					}}
				/>
			</div>

			{open && (
				<div
					style={{
						position: 'absolute',
						top: 'calc(100% + 8px)',
						right: 0,
						minWidth: 160,
						background: 'var(--surface)',
						border: '0.5px solid var(--border)',
						borderRadius: 10,
						padding: 4,
						zIndex: 100,
						boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
					}}
				>
					{/* кнопки без изменений, только цвета через переменные */}
					{menuItems.map(({ label, onClick, danger }) => (
						<button
							key={label}
							onClick={onClick}
							style={{
								display: 'block',
								width: '100%',
								padding: '8px 12px',
								background: 'none',
								border: 'none',
								borderRadius: 7,
								textAlign: 'left',
								fontSize: 13,
								fontFamily: 'inherit',
								color: danger
									? 'var(--color-text-danger)'
									: 'var(--fg)',
								cursor: 'pointer',
								transition: 'background 0.1s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = danger
									? 'var(--color-background-danger)'
									: 'var(--surface-hover)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'none';
							}}
						>
							{label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
