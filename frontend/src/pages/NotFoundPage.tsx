import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-bg text-fg font-sans gap-4">
			<p className="text-xs text-muted tracking-widest uppercase m-0">404</p>
			<h1 className="text-4xl md:text-5xl font-medium tracking-tight m-0">
				Страница не найдена.
			</h1>
			<p className="text-sm text-muted m-0">
				Такой страницы не существует или она была удалена.
			</p>
			<button
				onClick={() => navigate('/')}
				className="mt-2 px-5 py-2.5 bg-fg text-bg border-none rounded-btn text-sm font-medium font-sans cursor-pointer"
			>
				На главную
			</button>
		</div>
	);
}
