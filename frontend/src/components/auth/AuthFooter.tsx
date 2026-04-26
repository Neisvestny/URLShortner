import type { AuthMode } from '../../types/formState';

type Props = { isRegister: boolean; onToggle: (newMode: AuthMode) => void };

export default function AuthFooter({ isRegister, onToggle }: Props) {
	return (
		<p className="text-center text-sm text-muted m-0">
			{isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
			<button
				onClick={() => onToggle(isRegister ? 'login' : 'register')}
				className="bg-transparent border-none text-fg cursor-pointer text-sm font-sans p-0 underline decoration-border-hover underline-offset-[3px]"
			>
				{isRegister ? 'Войти' : 'Зарегистрироваться'}
			</button>
		</p>
	);
}
