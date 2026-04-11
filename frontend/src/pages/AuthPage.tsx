import AuthError from '../components/auth/AuthError';
import AuthFooter from '../components/auth/AuthFooter';
import AuthForm from '../components/auth/AuthForm';
import AuthHeader from '../components/auth/AuthHeader';
import AuthModeSwitch from '../components/auth/AuthModeSwitch';
import AuthSeparator from '../components/auth/AuthSeparator';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import { useAuthForm } from '../hooks/useAuthForm';
import MainLayout from '../layouts/MainLayout';

export default function AuthPage() {
	const {
		mode,
		form,
		isLoading,
		error,
		isRegister,
		handleChange,
		handleModeSwitch,
		handleSubmit,
	} = useAuthForm();

	return (
		<MainLayout>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					paddingTop: 40,
				}}
			>
				<div
					style={{
						width: '100%',
						maxWidth: 400,
					}}
				>
					{/* Заголовок */}
					<AuthHeader isRegister={isRegister} />

					{/* Переключатель режима */}
					<AuthModeSwitch mode={mode} onChange={handleModeSwitch} />

					{/* Поля формы */}
					<AuthForm
						form={form}
						isRegister={isRegister}
						onChange={handleChange}
					/>

					{/* Ошибка */}
					{error && <AuthError message={error} />}

					{/* Кнопка */}
					<AuthSubmitButton
						isLoading={isLoading}
						isRegister={isRegister}
						onClick={handleSubmit}
					/>

					{/* Разделитель */}
					<AuthSeparator />

					{/* Подсказка переключения */}
					<AuthFooter
						isRegister={isRegister}
						onToggle={handleModeSwitch}
					/>
				</div>
			</div>
		</MainLayout>
	);
}
