import { Eye, EyeOff } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import type FormState from '../../types/formState';
import getPasswordStrength from '../../utils/getPasswordStrength';

const inputStyle: React.CSSProperties = {
	width: '100%',
	padding: '10px 14px',
	background: 'var(--surface)',
	border: '0.5px solid var(--border)',
	borderRadius: 8,
	color: 'var(--fg)',
	fontSize: 14,
	outline: 'none',
	boxSizing: 'border-box',
	transition: 'border-color 0.15s',
	fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
	display: 'block',
	fontSize: 13,
	color: 'var(--muted)',
	marginBottom: 6,
	letterSpacing: '0.01em',
};

type Props = {
	form: FormState;
	isRegister: boolean;
	onChange: (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthForm({ form, isRegister, onChange }: Props) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const passwordStrength = getPasswordStrength(form.password);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 16,
			}}
		>
			{isRegister && (
				<div>
					<label style={labelStyle}>Имя пользователя</label>
					<input
						type="text"
						placeholder="username"
						value={form.username}
						onChange={onChange('username')}
						onFocus={() => setFocusedField('username')}
						onBlur={() => setFocusedField(null)}
						style={{
							...inputStyle,
							borderColor:
								focusedField === 'username'
									? 'var(--border-hover)'
									: 'var(--border)',
						}}
					/>
				</div>
			)}

			<div>
				<label style={labelStyle}>Email</label>
				<input
					type="email"
					placeholder="you@example.com"
					value={form.email}
					onChange={onChange('email')}
					onFocus={() => setFocusedField('email')}
					onBlur={() => setFocusedField(null)}
					style={{
						...inputStyle,
						borderColor:
							focusedField === 'email' ? 'var(--border-hover)' : 'var(--border)',
					}}
				/>
			</div>

			<div>
				<label style={labelStyle}>Пароль</label>

				<div style={{ position: 'relative' }}>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder="••••••••"
						value={form.password}
						onChange={onChange('password')}
						style={{
							...inputStyle,
							paddingRight: 40,
						}}
					/>

					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						style={{
							position: 'absolute',
							right: 10,
							top: '50%',
							transform: 'translateY(-50%)',
							background: 'none',
							border: 'none',
							color: 'var(--muted)',
							cursor: 'pointer',
						}}
					>
						{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
					</button>
				</div>
			</div>

			{isRegister && (
				<>
					<div>
						<label style={labelStyle}>Повторите пароль</label>

						<div style={{ position: 'relative' }}>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="••••••••"
								value={form.confirmPassword}
								onChange={onChange('confirmPassword')}
								onFocus={() => setFocusedField('confirmPassword')}
								onBlur={() => setFocusedField(null)}
								style={{
									...inputStyle,
									paddingRight: 40,
									borderColor:
										focusedField === 'confirmPassword'
											? 'var(--border-hover)'
											: 'var(--border)',
								}}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword((prev) => !prev)}
								style={{
									position: 'absolute',
									right: 10,
									top: '50%',
									transform: 'translateY(-50%)',
									background: 'none',
									border: 'none',
									color: 'var(--muted)',
									cursor: 'pointer',
								}}
							>
								{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
							</button>
						</div>
					</div>

					{form.password && (
						<div style={{ marginTop: 6 }}>
							<div
								style={{
									height: 4,
									borderRadius: 4,
									background: 'var(--border)',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										width: `${
											passwordStrength.label === 'Слабый'
												? 33
												: passwordStrength.label === 'Средний'
													? 66
													: 100
										}%`,
										height: '100%',
										background: passwordStrength.color,
										transition: '0.2s',
									}}
								/>
							</div>

							<div
								style={{
									fontSize: 12,
									color: passwordStrength.color,
									marginTop: 4,
								}}
							>
								{passwordStrength.label}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
