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
				className="flex justify-center pt-10"
				onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
			>
				<div className="w-full max-w-sm">
					<AuthHeader isRegister={isRegister} />
					<AuthModeSwitch mode={mode} onChange={handleModeSwitch} />

					<div key={mode} className="animate-[fadeIn_0.2s_ease]">
						<AuthForm form={form} isRegister={isRegister} onChange={handleChange} />
						{error && <AuthError message={error} />}
						<AuthSubmitButton
							isLoading={isLoading}
							isRegister={isRegister}
							onClick={handleSubmit}
						/>
					</div>

					<AuthSeparator />
					<AuthFooter isRegister={isRegister} onToggle={handleModeSwitch} />
				</div>
			</div>
		</MainLayout>
	);
}
