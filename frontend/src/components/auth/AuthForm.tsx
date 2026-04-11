import { useState, type ChangeEvent } from 'react';
import type FormState from '../../types/formState';

const inputStyle: React.CSSProperties = {
	width: '100%',
	padding: '10px 14px',
	background: '#111',
	border: '1px solid #222',
	borderRadius: 8,
	color: '#ededed',
	fontSize: 14,
	outline: 'none',
	boxSizing: 'border-box',
	transition: 'border-color 0.15s',
	fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
	display: 'block',
	fontSize: 13,
	color: '#888',
	marginBottom: 6,
	letterSpacing: '0.01em',
};

type Props = {
	form: FormState;
	isRegister: boolean;
	onChange: (
		field: keyof FormState,
	) => (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthForm({ form, isRegister, onChange }: Props) {
	const [focusedField, setFocusedField] = useState<string | null>(null);

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
									? '#333'
									: '#1f1f1f',
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
							focusedField === 'email' ? '#333' : '#1f1f1f',
					}}
				/>
			</div>

			<div>
				<label style={labelStyle}>Пароль</label>
				<input
					type="password"
					placeholder="••••••••"
					value={form.password}
					onChange={onChange('password')}
					onFocus={() => setFocusedField('password')}
					onBlur={() => setFocusedField(null)}
					style={{
						...inputStyle,
						borderColor:
							focusedField === 'password' ? '#333' : '#1f1f1f',
					}}
				/>
			</div>

			{isRegister && (
				<div>
					<label style={labelStyle}>Повторите пароль</label>
					<input
						type="password"
						placeholder="••••••••"
						value={form.confirmPassword}
						onChange={onChange('confirmPassword')}
						onFocus={() => setFocusedField('confirmPassword')}
						onBlur={() => setFocusedField(null)}
						style={{
							...inputStyle,
							borderColor:
								focusedField === 'confirmPassword'
									? '#333'
									: '#1f1f1f',
						}}
					/>
				</div>
			)}
		</div>
	);
}
