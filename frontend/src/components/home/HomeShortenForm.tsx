import { useState } from 'react';
import { selectIsAuthenticated } from '../../features/auth/selectors.ts';
import { useAppSelector } from '../../hooks/storeHooks.ts';
import { useShortener } from '../../hooks/useShortener';
import type { CopyKey } from '../../types/shortenResult.ts';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { isValidUrl } from '../../utils/isValidUrl';
import ResultList from './HomeResultList';
import UrlInput from './HomeUrlInput';

type CopiedState = Record<CopyKey, boolean>;

export default function ShortenForm() {
	const [url, setUrl] = useState('');
	const [copied, setCopied] = useState<CopiedState>({ short: false, stats: false });
	const { loading, error, result, shorten, setError } = useShortener();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	function handleShorten() {
		const trimmed = url.trim();
		if (!isValidUrl(trimmed)) {
			setError('Введите корректный URL');
			return;
		}
		shorten(trimmed);
	}

	async function handleCopy(text: string, key: CopyKey) {
		const success = await copyToClipboard(text);
		if (!success) return;
		setCopied((prev) => ({ ...prev, [key]: true }));
		setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
	}

	return (
		<div
			className={`w-full max-w-2xl bg-surface border rounded-2xl p-6 transition-colors mx-auto ${result ? 'border-border-hover' : 'border-border'}`}
		>
			<UrlInput
				value={url}
				error={!!error}
				loading={loading}
				onChange={(v) => {
					setUrl(v);
					setError('');
				}}
				onSubmit={handleShorten}
			/>

			{error && <p className="text-xs text-danger m-0 mt-1">{error}</p>}

			{result && (
				<ResultList
					result={result}
					copied={copied}
					onCopy={handleCopy}
					showStats={isAuthenticated}
				/>
			)}
		</div>
	);
}
