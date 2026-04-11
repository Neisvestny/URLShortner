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
			{/* Badge */}
			<div
				onClick={() => setOpen((v) => !v)}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					padding: '4px 10px 4px 4px',
					border: `1px solid ${open ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
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
						background: 'rgba(237,237,237,0.1)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 11,
						fontWeight: 500,
						color: '#ededed',
						letterSpacing: '0.3px',
					}}
				>
					{initials}
				</div>
				<span style={{ fontSize: 13, color: '#ededed' }}>
					{username}
				</span>
			</div>

			{/* Dropdown */}
			{open && (
				<div
					style={{
						position: 'absolute',
						top: 'calc(100% + 8px)',
						right: 0,
						minWidth: 160,
						background: '#111',
						border: '1px solid rgba(255,255,255,0.08)',
						borderRadius: 10,
						padding: 4,
						zIndex: 100,
						boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
					}}
				>
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
								color: danger ? '#f87171' : '#ededed',
								cursor: 'pointer',
								transition: 'background 0.1s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = danger
									? 'rgba(248,113,113,0.08)'
									: 'rgba(255,255,255,0.06)';
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
