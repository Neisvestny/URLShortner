type Props = {
	isRegister: boolean;
};

export default function AuthHeader({ isRegister }: Props) {
	return (
		<div style={{ marginBottom: 36 }}>
			<h1
				style={{
					fontSize: 'clamp(28px, 5vw, 36px)',
					fontWeight: 500,
					letterSpacing: '-1.5px',
					lineHeight: 1.1,
					margin: '0 0 8px',
					color: 'var(--fg)',
				}}
			>
				{isRegister ? 'Создать аккаунт.' : 'С возвращением.'}
			</h1>
			<p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
				{isRegister
					? 'Зарегистрируйтесь, чтобы отслеживать ссылки'
					: 'Войдите, чтобы продолжить'}
			</p>
		</div>
	);
}
