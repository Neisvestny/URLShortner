import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface Props {
	code: string;
	total: number;
	originalUrl?: string;
}

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
		<div style={{ marginBottom: 28 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
				<h1
					style={{
						fontSize: 'clamp(24px, 4vw, 36px)',
						fontWeight: 500,
						letterSpacing: '-1px',
						margin: 0,
						color: 'var(--fg)',
					}}
				>
					/{code}
				</h1>

				<button
					onClick={handleCopy}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 32,
						height: 32,
						borderRadius: 8,
						border: '0.5px solid',
						borderColor: copied ? '#4ade80' : 'var(--border)',
						background: copied
							? 'rgba(74,222,128,0.08)'
							: 'var(--surface)',
						color: copied ? '#4ade80' : 'var(--muted)',
						cursor: 'pointer',
						transition: 'all 0.2s ease',
					}}
					onMouseEnter={(e) => {
						if (!copied) {
							e.currentTarget.style.color = 'var(--fg)';
							e.currentTarget.style.borderColor =
								'var(--border-hover)';
						}
					}}
					onMouseLeave={(e) => {
						if (!copied) {
							e.currentTarget.style.color = 'var(--muted)';
							e.currentTarget.style.borderColor = 'var(--border)';
						}
					}}
				>
					{copied ? <Check size={16} /> : <Copy size={16} />}
				</button>
			</div>

			<div
				style={{
					marginTop: 4,
					display: 'flex',
					alignItems: 'center',
					gap: 8,
				}}
			>
				<a
					href={originalUrl}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						fontSize: 13,
						color: 'var(--muted)',
						textDecoration: 'none',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						maxWidth: 500,
						transition: 'color 0.15s',
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.color = 'var(--fg)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.color = 'var(--muted)')
					}
				>
					{originalUrl}
				</a>

				<span style={{ fontSize: 13, color: 'var(--muted)' }}>
					| {total} переходов
				</span>
			</div>
		</div>
	);
}
