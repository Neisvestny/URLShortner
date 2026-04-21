import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { setUser } from '../features/auth/authSlice';
import type FormState from '../types/formState';
import getPasswordStrength from '../utils/getPasswordStrength';
import { useAppDispatch } from './storeHooks';

export const useAuthSubmit = (
	form: FormState,
	isRegister: boolean,
	onError: (msg: string) => void,
) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const validateForm = useCallback(() => {
		if (isRegister && form.password !== form.confirmPassword) {
			onError('Пароли не совпадают');
			return false;
		}

		if (isRegister && getPasswordStrength(form.password).label === 'Слабый') {
			onError('Пароль слишком слабый');
			return false;
		}

		return true;
	}, [form.confirmPassword, form.password, isRegister, onError]);

	const handleSubmit = useCallback(async () => {
		if (!validateForm()) return;

		try {
			setIsLoading(true);

			if (isRegister) {
				await authApi.register({
					username: form.username,
					email: form.email,
					password: form.password,
				});
			}

			const res = await authApi.login({
				email: form.email,
				password: form.password,
			});

			dispatch(setUser(res.data.user));
			navigate('/stats');
		} catch (err: any) {
			const e = err?.response?.data?.error;

			const message = e
				? `${e.message}${e.details ? `: ${JSON.stringify(e.details)}` : ''}`
				: err?.message || 'Неизвестная ошибка';

			onError(message);
		} finally {
			setIsLoading(false);
		}
	}, [
		dispatch,
		form.email,
		form.password,
		form.username,
		isRegister,
		navigate,
		onError,
		validateForm,
	]);

	return { isLoading, handleSubmit };
};
