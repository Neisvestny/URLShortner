import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Link } from '../../types/link';
import highlight from '../../utils/highlight';
import { truncate } from '../../utils/truncate';
import VisitBar from './LinkVisitBar';

type Props = { link: Link; index: number; query: string; maxVisits: number };

export default function StatsCard({ link, index, query, maxVisits }: Props) {
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);

	return (
		<div
			onClick={() => navigate(`/${link.slug}+`)}
			className="px-6 py-5 rounded-card bg-surface border border-border transition-colors cursor-pointer hover:bg-surface-hover hover:border-border-hover"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2.5 mb-1.5">
						<span
							className={`text-xs font-medium px-1.5 py-0.5 rounded-md border ${
								index === 0
									? 'text-accent border-accent/25 bg-accent/10'
									: 'text-muted border-border bg-bg'
							}`}
						>
							#{index + 1}
						</span>
						<span className="text-base font-medium text-fg tracking-tight">
							/{highlight(link.slug, query)}
						</span>
					</div>
					<p
						className="m-0 text-sm text-muted overflow-hidden text-ellipsis whitespace-nowrap"
						title={link.original_url}
					>
						{highlight(truncate(link.original_url, 60), query)}
					</p>
					<VisitBar visits={link.visits} max={maxVisits} />
				</div>

				<div className="flex gap-6 items-center shrink-0">
					<div className="text-right">
						<p className="m-0 text-2xl font-medium tracking-tight leading-none text-fg">
							{link.visits.toLocaleString('ru')}
						</p>
						<p className="m-0 mt-1 text-xs text-muted uppercase tracking-wider">
							переходов
						</p>
					</div>

					<div className="text-right">
						<p className="m-0 text-sm text-muted leading-none">
							{link.last_visit
								? new Date(link.last_visit).toLocaleDateString('ru', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									})
								: '—'}
						</p>
						<p className="m-0 mt-1 text-xs text-muted uppercase tracking-wider opacity-60">
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
						className="size-[34px] rounded-lg border border-border bg-bg text-muted cursor-pointer flex items-center justify-center shrink-0 transition-colors hover:text-fg hover:border-border-hover"
					>
						{copied ? <Check size={14} /> : <Copy size={14} />}
					</button>
				</div>
			</div>
		</div>
	);
}
