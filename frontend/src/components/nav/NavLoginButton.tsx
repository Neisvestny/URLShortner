import { useNavigate } from 'react-router-dom';

export default function LoginButton() {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => navigate('/login')}
			className="text-sm h-8 px-3.5 text-fg bg-surface border border-border rounded-md cursor-pointer transition-all font-sans font-medium hover:bg-surface-hover hover:border-border-hover"
		>
			Войти
		</button>
	);
}
