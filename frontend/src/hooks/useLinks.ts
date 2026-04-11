import { useEffect, useState } from 'react';
import { linksApi } from '../api/linksApi';
import type { Link } from '../types/link';

export function useLinks() {
	const [links, setLinks] = useState<Link[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		linksApi
			.getMyLinks()
			.then(({ data }) => setLinks(data.links))
			.catch(() => setError('Не удалось загрузить ссылки'))
			.finally(() => setIsLoading(false));
	}, []);

	return { links, isLoading, error };
}
