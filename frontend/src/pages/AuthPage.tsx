import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import AuthError from '../components/auth/AuthError';
import AuthFooter from '../components/auth/AuthFooter';
import AuthForm from '../components/auth/AuthForm';
import AuthHeader from '../components/auth/AuthHeader';
import AuthModeSwitch from '../components/auth/AuthModeSwitch';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import { setUser } from '../features/auth/authSlice';
import { selectIsAuthenticated } from '../features/auth/selectors';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import MainLayout from '../layouts/MainLayout';
import type FormState from '../types/formState';
import type { AuthMode } from '../types/formState';

export default function AuthPage() {
	const [mode, setMode] = useState<AuthMode>('login');
	const [form, setForm] = useState<FormState>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	const isRegister = mode === 'register';

	useEffect(() => {
		if (isAuth) {
			navigate('/stats');
		}
	}, [isAuth, navigate]);

	const handleChange =
		(field: keyof FormState) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
			setError(null);
		};

	const handleModeSwitch = (newMode: AuthMode) => {
		setMode(newMode);
		setError(null);
		setForm({ username: '', email: '', password: '', confirmPassword: '' });
	};

	const handleSubmit = async () => {
		if (isRegister && form.password !== form.confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}

		setIsLoading(true);

		try {
			if (isRegister) {
				await authApi.register({
					username: form.username,
					email: form.email,
					password: form.password,
				});
			}

			// логин после регистрации ИЛИ просто логин
			const res = await authApi.login({
				email: form.email,
				password: form.password,
			});

			// сохраняем пользователя в redux
			dispatch(setUser(res.data.user));
			navigate('/stats');
		} catch (err: any) {
			const e = err?.response?.data?.error;

			const message = e
				? `${e.message}${e.details ? `: ${JSON.stringify(e.details)}` : ''}`
				: err?.message || 'Неизвестная ошибка';

			setError(message);
		} finally {
			setIsLoading(false);
		}
	};

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
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							margin: '24px 0',
						}}
					>
						<div
							style={{
								flex: 1,
								height: 1,
								background: '#1f1f1f',
							}}
						/>
						<span style={{ fontSize: 12, color: '#444' }}>или</span>
						<div
							style={{
								flex: 1,
								height: 1,
								background: '#1f1f1f',
							}}
						/>
					</div>

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
