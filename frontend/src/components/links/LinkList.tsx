import type { Link } from '../../types/link';
import StatsCard from './LinkCard';

type Props = { links: Link[]; query: string; maxVisits: number };

export default function StatsList({ links, query, maxVisits }: Props) {
	if (links.length === 0) {
		return (
			<div className="text-center py-16 px-6 text-muted text-sm border border-dashed border-border-hover rounded-card">
				{query.trim() === ''
					? 'У пользователя отсутствуют ссылки'
					: `Ничего не найдено по запросу «${query}»`}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{links.map((link, i) => (
				<StatsCard
					key={link.id}
					link={link}
					index={i}
					query={query}
					maxVisits={maxVisits}
				/>
			))}
		</div>
	);
}
