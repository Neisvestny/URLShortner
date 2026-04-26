import type { AuthMode } from '../../types/formState';

type Props = { mode: AuthMode; onChange: (mode: AuthMode) => void };

export default function AuthModeSwitch({ mode, onChange }: Props) {
	return (
		<div className="flex bg-bg border border-border rounded-lg p-1 mb-7 gap-1">
			{(['login', 'register'] as AuthMode[]).map((m) => (
				<button
					key={m}
					onClick={() => onChange(m)}
					className={`flex-1 py-2 rounded-md border-none cursor-pointer text-sm font-medium font-sans transition-all ${
						mode === m
							? 'bg-surface text-fg shadow-[0_0_0_0.5px_var(--border-hover)]'
							: 'bg-transparent text-muted'
					}`}
				>
					{m === 'login' ? 'Вход' : 'Регистрация'}
				</button>
			))}
		</div>
	);
}
