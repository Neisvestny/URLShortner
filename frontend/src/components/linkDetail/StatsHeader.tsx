import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type Props = {
	code: string;
	total: number;
	originalUrl?: string;
};

export default function StatsHeader({ code, total, originalUrl }: Props) {
	const [copied, setCopied] = useState(false);
	const shortUrl = `${window.location.origin}/${code}`;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shortUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		} catch (e) {
			console.error('Copy failed', e);
		}
	};

	return (
		<div className="mb-7">
			<div className="flex items-center gap-2.5">
				<h1 className="text-4xl md:text-5xl font-medium tracking-tight m-0 text-fg">
					/{code}
				</h1>
				<button
					onClick={handleCopy}
					className={`size-8 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
						copied
							? 'border-green-500/40 bg-green-500/10 text-green-400'
							: 'border-border bg-surface text-muted hover:text-fg hover:border-border-hover'
					}`}
				>
					{copied ? <Check size={16} /> : <Copy size={16} />}
				</button>
			</div>

			<div className="mt-1 flex items-center gap-2">
				<a
					href={originalUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-muted no-underline overflow-hidden text-ellipsis whitespace-nowrap max-w-[500px] transition-colors hover:text-fg"
				>
					{originalUrl}
				</a>
				<span className="text-sm text-muted">| {total} переходов</span>
			</div>
		</div>
	);
}
