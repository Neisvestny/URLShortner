import { BROWSER_COLORS, OS_COLORS } from '../../../constants/colors';
import { FLAG } from '../../../constants/flags';
import type { Visit } from '../../../types/visit';
import formatDate from '../../../utils/formatDate';

interface VisitRowProps {
	visit: Visit;
	index: number;
	totalRows: number;
}

export function VisitRow({ visit, index, totalRows }: VisitRowProps) {
	return (
		<tr
			key={visit.id}
			style={{
				borderBottom: index < totalRows - 1 ? '0.5px solid var(--border)' : 'none',
				transition: 'background 0.12s',
			}}
			onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
			onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
		>
			<td
				style={{
					padding: '13px 14px',
					color: 'var(--muted)',
					whiteSpace: 'nowrap',
				}}
			>
				{formatDate(visit.visited_at)}
			</td>
			<td
				style={{
					padding: '13px 14px',
					whiteSpace: 'nowrap',
				}}
			>
				<span style={{ marginRight: 6 }}>
					{visit.country ? (FLAG[visit.country] ?? '🌐') : '🌐'}
				</span>
				{visit.region ?? visit.country ?? 'Неизвестно'}
			</td>
			<td
				style={{
					padding: '13px 14px',
					whiteSpace: 'nowrap',
				}}
			>
				<span
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 6,
					}}
				>
					<span
						style={{
							width: 7,
							height: 7,
							borderRadius: 99,
							background: BROWSER_COLORS[visit.browser ?? ''] ?? '#444',
							flexShrink: 0,
						}}
					/>
					{visit.browser ?? 'Неизвестно'}
					<span
						style={{
							color: 'var(--muted)',
							fontSize: 11,
							opacity: 0.6,
						}}
					>
						{visit.browser_version}
					</span>
				</span>
			</td>
			<td
				style={{
					padding: '13px 14px',
					whiteSpace: 'nowrap',
				}}
			>
				<span
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 6,
					}}
				>
					<span
						style={{
							width: 7,
							height: 7,
							borderRadius: 99,
							background: OS_COLORS[visit.os ?? ''] ?? '#444',
							flexShrink: 0,
						}}
					/>
					{visit.os ?? 'Неизвестно'}
				</span>
			</td>
			<td
				style={{
					padding: '13px 14px',
					color: 'var(--muted)',
					fontFamily: 'monospace',
					fontSize: 12,
					opacity: 0.7,
				}}
			>
				{visit.ip}
			</td>
		</tr>
	);
}
