import { Eye, EyeOff } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import type FormState from '../../types/formState';
import getPasswordStrength from '../../utils/getPasswordStrength';

const inputClass =
	'w-full px-3.5 py-2.5 bg-surface border border-border rounded-btn text-fg text-sm outline-none transition-colors font-sans placeholder:text-muted focus:border-border-hover';

type Props = {
	form: FormState;
	isRegister: boolean;
	onChange: (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthForm({ form, isRegister, onChange }: Props) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const passwordStrength = getPasswordStrength(form.password);

	return (
		<div className="flex flex-col gap-4">
			{isRegister && (
				<div>
					<label className="block text-sm text-muted mb-1.5">Имя пользователя</label>
					<input
						type="text"
						placeholder="username"
						value={form.username}
						onChange={onChange('username')}
						className={inputClass}
					/>
				</div>
			)}

			<div>
				<label className="block text-sm text-muted mb-1.5">Email</label>
				<input
					type="email"
					placeholder="you@example.com"
					value={form.email}
					onChange={onChange('email')}
					className={inputClass}
				/>
			</div>

			<div>
				<label className="block text-sm text-muted mb-1.5">Пароль</label>
				<div className="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder="••••••••"
						value={form.password}
						onChange={onChange('password')}
						className={`${inputClass} pr-10`}
					/>
					<button
						type="button"
						onClick={() => setShowPassword((v) => !v)}
						className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-muted cursor-pointer p-0 flex"
					>
						{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
					</button>
				</div>
			</div>

			{isRegister && (
				<>
					<div>
						<label className="block text-sm text-muted mb-1.5">Повторите пароль</label>
						<div className="relative">
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="••••••••"
								value={form.confirmPassword}
								onChange={onChange('confirmPassword')}
								className={`${inputClass} pr-10`}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword((v) => !v)}
								className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-muted cursor-pointer p-0 flex"
							>
								{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
							</button>
						</div>
					</div>

					{form.password && (
						<div>
							<div className="h-1 rounded bg-border overflow-hidden">
								<div
									className="h-full rounded transition-all duration-200"
									style={{
										width:
											passwordStrength.label === 'Слабый'
												? '33%'
												: passwordStrength.label === 'Средний'
													? '66%'
													: '100%',
										background: passwordStrength.color,
									}}
								/>
							</div>
							<div className="text-xs mt-1" style={{ color: passwordStrength.color }}>
								{passwordStrength.label}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
