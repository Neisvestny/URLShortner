import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Link } from '../../types/link';
import highlight from '../../utils/highlight';
import { truncate } from '../../utils/truncate';
import VisitBar from './LinkVisitBar';

type Props = {
	link: Link;
	index: number;
	query: string;
	maxVisits: number;
};

export default function StatsCard({ link, index, query, maxVisits }: Props) {
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);

	return (
		<div
			onClick={() => navigate(`/${link.slug}+`)}
			style={{
				padding: '20px 24px',
				borderRadius: 14,
				background: 'var(--surface)',
				border: '0.5px solid var(--border)',
				transition: 'border-color 0.15s, background 0.15s',
				cursor: 'pointer',
			}}
			onMouseEnter={(e) => {
				(e.currentTarget as HTMLDivElement).style.background = 'var(--surface-hover)';
				(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)';
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLDivElement).style.background = 'var(--surface)';
				(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					gap: 16,
				}}
			>
				{/* Left */}
				<div style={{ minWidth: 0, flex: 1 }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							marginBottom: 6,
						}}
					>
						<span
							style={{
								fontSize: 11,
								fontWeight: 500,
								color: index === 0 ? '#b48cff' : 'var(--muted)',
								background: index === 0 ? 'rgba(180,140,255,0.1)' : 'var(--bg)',
								border: `0.5px solid ${index === 0 ? 'rgba(180,140,255,0.25)' : 'var(--border)'}`,
								borderRadius: 6,
								padding: '2px 7px',
								letterSpacing: '0.03em',
							}}
						>
							#{index + 1}
						</span>
						<span
							style={{
								fontSize: 15,
								fontWeight: 500,
								color: 'var(--fg)',
								letterSpacing: '-0.3px',
							}}
						>
							/{highlight(link.slug, query)}
						</span>
					</div>

					<p
						style={{
							margin: 0,
							fontSize: 13,
							color: 'var(--muted)',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
						title={link.original_url}
					>
						{highlight(truncate(link.original_url, 60), query)}
					</p>

					<VisitBar visits={link.visits} max={maxVisits} />
				</div>

				{/* Right */}
				<div
					style={{
						display: 'flex',
						gap: 24,
						alignItems: 'center',
						flexShrink: 0,
					}}
				>
					<div style={{ textAlign: 'right' }}>
						<p
							style={{
								margin: 0,
								fontSize: 22,
								fontWeight: 500,
								letterSpacing: '-0.8px',
								lineHeight: 1,
								color: 'var(--fg)',
							}}
						>
							{link.visits.toLocaleString('ru')}
						</p>
						<p
							style={{
								margin: '4px 0 0',
								fontSize: 11,
								color: 'var(--muted)',
								textTransform: 'uppercase',
								letterSpacing: '0.05em',
							}}
						>
							переходов
						</p>
					</div>

					<div style={{ textAlign: 'right' }}>
						<p
							style={{
								margin: 0,
								fontSize: 13,
								color: 'var(--muted)',
								lineHeight: 1,
							}}
						>
							{link.last_visit
								? new Date(link.last_visit).toLocaleDateString('ru', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									})
								: '—'}
						</p>
						<p
							style={{
								margin: '4px 0 0',
								fontSize: 11,
								color: 'var(--muted)',
								textTransform: 'uppercase',
								letterSpacing: '0.05em',
								opacity: 0.6,
							}}
						>
							последний
						</p>
					</div>

					<button
						onClick={(e) => {
							e.stopPropagation();

							navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`);
							setCopied(true);

							setTimeout(() => setCopied(false), 1500);
						}}
						title="Скопировать ссылку"
						style={{
							width: 34,
							height: 34,
							borderRadius: 8,
							border: '0.5px solid var(--border)',
							background: 'var(--bg)',
							color: 'var(--muted)',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexShrink: 0,
							transition: 'color 0.15s, border-color 0.15s',
						}}
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)';
							(e.currentTarget as HTMLButtonElement).style.borderColor =
								'var(--border-hover)';
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
							(e.currentTarget as HTMLButtonElement).style.borderColor =
								'var(--border)';
						}}
					>
						{copied ? <Check size={14} /> : <Copy size={14} />}
					</button>
				</div>
			</div>
		</div>
	);
}
