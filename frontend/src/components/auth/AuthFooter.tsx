import type { AuthMode } from '../../types/formState';

type Props = {
	isRegister: boolean;
	onToggle: (newMode: AuthMode) => void;
};

export default function AuthFooter({ isRegister, onToggle }: Props) {
	return (
		<p
			style={{
				textAlign: 'center',
				fontSize: 13,
				color: '#555',
				margin: 0,
			}}
		>
			{isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
			<button
				onClick={() => onToggle(isRegister ? 'login' : 'register')}
				style={{
					background: 'none',
					border: 'none',
					color: '#ededed',
					cursor: 'pointer',
					fontSize: 13,
					fontFamily: 'inherit',
					padding: 0,
					textDecoration: 'underline',
					textDecorationColor: '#333',
					textUnderlineOffset: 3,
				}}
			>
				{isRegister ? 'Войти' : 'Зарегистрироваться'}
			</button>
		</p>
	);
}
