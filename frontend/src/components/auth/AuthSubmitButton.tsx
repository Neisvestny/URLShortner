type Props = {
	isLoading: boolean;
	isRegister: boolean;
	onClick: () => void;
};

export default function AuthSubmitButton({
	isLoading,
	isRegister,
	onClick,
}: Props) {
	return (
		<button
			onClick={onClick}
			disabled={isLoading}
			style={{
				width: '100%',
				marginTop: 24,
				padding: '11px 0',
				background: '#ededed',
				color: '#0a0a0a',
				border: 'none',
				borderRadius: 8,
				fontSize: 14,
				fontWeight: 500,
				fontFamily: 'inherit',
				cursor: isLoading ? 'not-allowed' : 'pointer',
				opacity: isLoading ? 0.6 : 1,
				transition: 'opacity 0.15s',
				letterSpacing: '-0.01em',
			}}
		>
			{isLoading
				? 'Загрузка...'
				: isRegister
					? 'Создать аккаунт'
					: 'Войти'}
		</button>
	);
}
