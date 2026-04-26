import { BROWSER_COLORS, OS_COLORS } from '../../../constants/colors';
import { FLAG } from '../../../constants/flags';
import type { Visit } from '../../../types/visit';
import formatDate from '../../../utils/formatDate';

type Props = {
	visit: Visit;
	index: number;
	totalRows: number;
};

export function VisitRow({ visit, index, totalRows }: Props) {
	return (
		<tr
			className={`transition-colors hover:bg-surface ${index < totalRows - 1 ? 'border-b border-border' : ''}`}
		>
			<td className="px-3.5 py-3 text-muted whitespace-nowrap">
				{formatDate(visit.visited_at)}
			</td>
			<td className="px-3.5 py-3 whitespace-nowrap">
				<span className="mr-1.5">
					{visit.country ? (FLAG[visit.country] ?? '🌐') : '🌐'}
				</span>
				{visit.region ?? visit.country ?? 'Неизвестно'}
			</td>
			<td className="px-3.5 py-3 whitespace-nowrap">
				<span className="inline-flex items-center gap-1.5">
					<span
						className="size-[7px] rounded-full shrink-0"
						style={{ background: BROWSER_COLORS[visit.browser ?? ''] ?? '#444' }}
					/>
					{visit.browser ?? 'Неизвестно'}
					<span className="text-muted text-xs opacity-60">{visit.browser_version}</span>
				</span>
			</td>
			<td className="px-3.5 py-3 whitespace-nowrap">
				<span className="inline-flex items-center gap-1.5">
					<span
						className="size-[7px] rounded-full shrink-0"
						style={{ background: OS_COLORS[visit.os ?? ''] ?? '#444' }}
					/>
					{visit.os ?? 'Неизвестно'}
				</span>
			</td>
			<td className="px-3.5 py-3 text-muted font-mono text-xs opacity-70">{visit.ip}</td>
		</tr>
	);
}
