type Props = { isRegister: boolean };

export default function AuthHeader({ isRegister }: Props) {
	return (
		<div className="mb-9">
			<h1 className="text-4xl font-medium tracking-tight leading-tight m-0 mb-2 text-fg">
				{isRegister ? 'Создать аккаунт.' : 'С возвращением.'}
			</h1>
			<p className="text-sm text-muted m-0">
				{isRegister
					? 'Зарегистрируйтесь, чтобы отслеживать ссылки'
					: 'Войдите, чтобы продолжить'}
			</p>
		</div>
	);
}
