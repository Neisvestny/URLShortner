import type { User } from '../../types/user';
import StatsSearch from './LinkSearch';
import StatsSummary from './LinkSummary';

type Props = {
	user: User | null;
	totalLinks: number;
	totalVisits: number;
	topSlug: string;
	query: string;
	setQuery: (v: string) => void;
};

export default function StatsHeader({
	user,
	totalLinks,
	totalVisits,
	topSlug,
	query,
	setQuery,
}: Props) {
	return (
		<div className="mb-10">
			<p className="text-muted text-xs m-0 mb-2 tracking-widest uppercase">
				{user?.username} · обзор
			</p>
			<h1 className="text-4xl md:text-5xl font-medium tracking-tight m-0 mb-6 leading-tight text-fg">
				Ваши ссылки
			</h1>
			<StatsSummary totalLinks={totalLinks} totalVisits={totalVisits} topSlug={topSlug} />
			<StatsSearch query={query} setQuery={setQuery} />
		</div>
	);
}
