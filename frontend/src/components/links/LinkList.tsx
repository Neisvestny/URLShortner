import type { Link } from '../../types/link';
import StatsCard from './LinkCard';

type Props = {
	links: Link[];
	query: string;
	maxVisits: number;
};

export default function StatsList({ links, query, maxVisits }: Props) {
	const isQueryEmpty = query.trim() === '';

	if (links.length === 0) {
		return (
			<div
				style={{
					textAlign: 'center',
					padding: '60px 24px',
					color: '#444',
					fontSize: 14,
					border: '1px dashed rgba(255,255,255,0.07)',
					borderRadius: 14,
				}}
			>
				{isQueryEmpty
					? 'У пользователя отсутствуют ссылки'
					: `Ничего не найдено по запросу «${query}»`}
			</div>
		);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
