import type { AuthMode } from '../../types/formState';

type Props = {
	mode: AuthMode;
	onChange: (mode: AuthMode) => void;
};

export default function AuthModeSwitch({ mode, onChange }: Props) {
	return (
		<div
			style={{
				display: 'flex',
				background: '#111',
				border: '1px solid #1f1f1f',
				borderRadius: 10,
				padding: 4,
				marginBottom: 28,
				gap: 4,
			}}
		>
			{(['login', 'register'] as AuthMode[]).map((m) => (
				<button
					key={m}
					onClick={() => onChange(m)}
					style={{
						flex: 1,
						padding: '8px 0',
						borderRadius: 7,
						border: 'none',
						cursor: 'pointer',
						fontSize: 13,
						fontWeight: 500,
						fontFamily: 'inherit',
						transition: 'all 0.15s',
						background: mode === m ? '#1a1a1a' : 'transparent',
						color: mode === m ? '#ededed' : '#555',
						boxShadow: mode === m ? '0 0 0 1px #2a2a2a' : 'none',
					}}
				>
					{m === 'login' ? 'Вход' : 'Регистрация'}
				</button>
			))}
		</div>
	);
}
