import { useState } from 'react';
import type FormState from '../types/formState';
import type { AuthMode } from '../types/formState';

export const useAuthFormState = () => {
	const [mode, setMode] = useState<AuthMode>('login');
	const [form, setForm] = useState<FormState>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState<string | null>(null);

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

	return { mode, form, error, setError, handleChange, handleModeSwitch };
};
