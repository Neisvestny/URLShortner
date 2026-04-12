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
				background: 'var(--bg)',
				border: '0.5px solid var(--border)',
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
						background:
							mode === m ? 'var(--surface)' : 'transparent',
						color: mode === m ? 'var(--fg)' : 'var(--muted)',
						boxShadow:
							mode === m
								? '0 0 0 0.5px var(--border-hover)'
								: 'none',
					}}
				>
					{m === 'login' ? 'Вход' : 'Регистрация'}
				</button>
			))}
		</div>
	);
}
