import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../features/auth/selectors';
import { useAppSelector } from '../hooks/storeHooks';
import type FormState from '../types/formState';
import type { AuthMode } from '../types/formState';
import { useAuthFormState } from './useAuthFormState';
import { useAuthSubmit } from './useAuthSubmit';

type UseAuthFormReturn = {
	mode: AuthMode;
	form: FormState;
	isLoading: boolean;
	error: string | null;
	isRegister: boolean;
	handleChange: (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleModeSwitch: (newMode: AuthMode) => void;
	handleSubmit: () => Promise<void>;
};

export const useAuthForm = (): UseAuthFormReturn => {
	const isAuth = useAppSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate('/stats');
		}
	}, [isAuth, navigate]);

	const { mode, form, error, setError, handleChange, handleModeSwitch } = useAuthFormState();
	const isRegister = mode === 'register';

	const { isLoading, handleSubmit } = useAuthSubmit(form, isRegister, setError);

	return {
		mode,
		form,
		isLoading,
		error,
		isRegister,
		handleChange,
		handleModeSwitch,
		handleSubmit,
	};
};
