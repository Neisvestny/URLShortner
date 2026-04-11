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
			try {
				const exists = await linksApi.checkLinkExists(code);

				if (!exists) {
					setNotFound(true);
				} else {
					window.location.replace(
						`${import.meta.env.VITE_API_URL}/r/${code}`,
					);
				}
			} catch {
				// если API умер — просто редиректим (fallback)
				window.location.replace(
					`${import.meta.env.VITE_API_URL}/r/${code}`,
				);
			}
		};

		handleRedirect();
	}, [code, isValid, isStats]);

	if (!code || !isValid) return <NotFoundPage />;
	if (notFound) return <LinkNotFoundPage />;
	if (isStats) return <LinkDetailPage code={cleanCode} />;

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#0a0a0a',
				color: '#555',
				fontSize: 14,
				fontFamily: "'Geist', sans-serif",
			}}
		>
			Перенаправление...
		</div>
	);
}
