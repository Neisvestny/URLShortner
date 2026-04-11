import { useState } from 'react';
import { useShortener } from '../../hooks/useShortener';
import type { CopyKey } from '../../types/shortenResult.ts';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { isValidUrl } from '../../utils/isValidUrl';
import ResultList from './HomeResultList';
import UrlInput from './HomeUrlInput';

type CopiedState = Record<CopyKey, boolean>;

export default function ShortenForm() {
	const [url, setUrl] = useState('');
	const [copied, setCopied] = useState<CopiedState>({
		short: false,
		stats: false,
	});
	const { loading, error, result, shorten, setError } = useShortener();

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
		setTimeout(() => {
			setCopied((prev) => ({ ...prev, [key]: false }));
		}, 2000);
	}

	return (
		<div
			style={{
				width: '100%',
				maxWidth: 800,
				background: '#111',
				border: `1px solid ${result ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
				borderRadius: 16,
				padding: 24,
				transition: 'border-color 0.2s',
				margin: '0 auto',
			}}
		>
			{/* Input row */}
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

			{/* Ошибка */}
			{error && (
				<p
					style={{
						fontSize: 12,
						color: '#ff4444',
						margin: '0',
					}}
				>
					{error}
				</p>
			)}

			{/* Результат */}
			{result && (
				<ResultList
					result={result}
					copied={copied}
					onCopy={handleCopy}
				/>
			)}

			<style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: none; }
        }
        @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
            40%            { transform: translateY(-3px); opacity: 1; }
        }
        `}</style>
		</div>
	);
}
