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

	return (
		<div
			onClick={() => navigate(`/${link.slug}+`)}
			style={{
				padding: '20px 24px',
				borderRadius: 14,
				background: 'rgba(255,255,255,0.03)',
				border: '1px solid rgba(255,255,255,0.07)',
				transition: 'border-color 0.15s, background 0.15s',
				cursor: 'pointer',
			}}
			onMouseEnter={(e) => {
				(e.currentTarget as HTMLDivElement).style.background =
					'rgba(255,255,255,0.055)';
				(e.currentTarget as HTMLDivElement).style.borderColor =
					'rgba(255,255,255,0.13)';
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLDivElement).style.background =
					'rgba(255,255,255,0.03)';
				(e.currentTarget as HTMLDivElement).style.borderColor =
					'rgba(255,255,255,0.07)';
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
								fontWeight: 600,
								color: index === 0 ? '#b48cff' : '#555',
								background:
									index === 0
										? 'rgba(180,140,255,0.1)'
										: 'rgba(255,255,255,0.04)',
								border: `1px solid ${index === 0 ? 'rgba(180,140,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
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
								color: '#ededed',
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
							color: '#555',
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
							}}
						>
							{link.visits.toLocaleString('ru')}
						</p>
						<p
							style={{
								margin: '4px 0 0',
								fontSize: 11,
								color: '#555',
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
								color: '#666',
								lineHeight: 1,
							}}
						>
							{link.last_visit
								? new Date(link.last_visit).toLocaleDateString(
										'ru',
										{
											day: 'numeric',
											month: 'short',
											year: 'numeric',
										},
									)
								: '—'}
						</p>
						<p
							style={{
								margin: '4px 0 0',
								fontSize: 11,
								color: '#444',
								textTransform: 'uppercase',
								letterSpacing: '0.05em',
							}}
						>
							последний
						</p>
					</div>

					<button
						onClick={(e) => {
							e.stopPropagation();
							navigator.clipboard.writeText(
								`https://shr.t/${link.slug}`,
							);
						}}
						title="Скопировать ссылку"
						style={{
							width: 34,
							height: 34,
							borderRadius: 8,
							border: '1px solid rgba(255,255,255,0.09)',
							background: 'rgba(255,255,255,0.04)',
							color: '#666',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexShrink: 0,
							transition: 'color 0.15s, border-color 0.15s',
						}}
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLButtonElement).style.color =
								'#ededed';
							(
								e.currentTarget as HTMLButtonElement
							).style.borderColor = 'rgba(255,255,255,0.2)';
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLButtonElement).style.color =
								'#666';
							(
								e.currentTarget as HTMLButtonElement
							).style.borderColor = 'rgba(255,255,255,0.09)';
						}}
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect
								x="9"
								y="9"
								width="13"
								height="13"
								rx="2"
								ry="2"
							/>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
