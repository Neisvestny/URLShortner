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
		<div style={{ marginBottom: 40 }}>
			<p
				style={{
					color: 'var(--muted)',
					fontSize: 13,
					margin: '0 0 8px',
					letterSpacing: '0.05em',
					textTransform: 'uppercase',
				}}
			>
				{user?.username} · обзор
			</p>
			<h1
				style={{
					fontSize: 'clamp(28px, 4vw, 40px)',
					fontWeight: 500,
					letterSpacing: '-1.5px',
					margin: '0 0 24px',
					lineHeight: 1.1,
					color: 'var(--fg)',
				}}
			>
				Ваши ссылки
			</h1>

			<StatsSummary
				totalLinks={totalLinks}
				totalVisits={totalVisits}
				topSlug={topSlug}
			/>

			<StatsSearch query={query} setQuery={setQuery} />
		</div>
	);
}
