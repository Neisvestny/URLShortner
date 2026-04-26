type Props = { isLoading: boolean; isRegister: boolean; onClick: () => void };

export default function AuthSubmitButton({ isLoading, isRegister, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			disabled={isLoading}
			className="w-full mt-6 py-3 bg-fg text-bg bg-surface border-none rounded-btn text-sm font-medium font-sans transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
		>
			{isLoading ? 'Загрузка...' : isRegister ? 'Создать аккаунт' : 'Войти'}
		</button>
	);
}
