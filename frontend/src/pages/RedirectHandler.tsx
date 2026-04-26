import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { linksApi } from '../api/linksApi';
import LinkDetailPage from './LinkDetailPage';
import LinkNotFoundPage from './LinkNotFoundPage';
import NotFoundPage from './NotFoundPage';

export default function RedirectHandler() {
	const { code } = useParams();
	const [notFound, setNotFound] = useState(false);

	const isStats = code?.endsWith('+');
	const cleanCode = isStats ? code!.slice(0, -1) : (code ?? '');
	const isValid = cleanCode.length === 6;

	useEffect(() => {
		if (!code || !isValid || isStats) return;
		const handleRedirect = async () => {
			const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');
			try {
				const exists = await linksApi.checkLinkExists(code);
				if (!exists) setNotFound(true);
				else window.location.replace(`${API_URL}/r/${code}`);
			} catch {
				window.location.replace(`${API_URL}/r/${code}`);
			}
		};
		handleRedirect();
	}, [code, isValid, isStats]);

	if (!code || !isValid) return <NotFoundPage />;
	if (notFound) return <LinkNotFoundPage />;
	if (isStats) return <LinkDetailPage code={cleanCode} />;

	return (
		<div className="min-h-screen flex items-center justify-center bg-bg text-muted text-sm font-sans">
			Перенаправление...
		</div>
	);
}
