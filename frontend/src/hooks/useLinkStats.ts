import { useEffect, useState } from 'react';
import { linksApi } from '../api/linksApi';
import type { Link } from '../types/link';
import type { Visit } from '../types/visit';

export function useLinkStats(slug: string) {
	const [link, setLink] = useState<Link | null>(null);
	const [visits, setVisits] = useState<Visit[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		async function load() {
			setIsLoading(true);
			try {
				const { data } = await linksApi.getLinkStats(slug);
				setLink(data.link);
				setVisits(data.visits);
			} catch {
				setError('Не удалось загрузить статистику');
			} finally {
				setIsLoading(false);
			}
		}

		load();
	}, [slug]);

	return { link, visits, isLoading, error };
}
