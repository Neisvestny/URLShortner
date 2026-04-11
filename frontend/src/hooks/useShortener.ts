import { useState } from 'react';
import { linksApi } from '../api/linksApi';
import type { ShortenResult } from '../types/shortenResult.ts';

export function useShortener() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [result, setResult] = useState<ShortenResult | null>(null);

	async function shorten(url: string) {
		setLoading(true);
		setError('');
		setResult(null);

		try {
			const { data } = await linksApi.createLink(url);
			const base = `${window.location.host}/${data.link.slug}`;

			setResult({
				shortLink: base,
				statsLink: `${base}+`,
				linkId: data.link.id,
			});
		} catch {
			setError('Ошибка сервера. Попробуй ещё раз.');
		} finally {
			setLoading(false);
		}
	}

	return { loading, error, result, shorten, setError };
}
