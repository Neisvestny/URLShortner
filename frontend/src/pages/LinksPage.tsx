import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import StatsHeader from '../components/links/LinkHeader';
import StatsList from '../components/links/LinkList';
import { selectIsAuthenticated, selectUser } from '../features/auth/selectors';
import { useAppSelector } from '../hooks/storeHooks';
import { useLinks } from '../hooks/useLinks';
import MainLayout from '../layouts/MainLayout';

function normalize(str: string) {
	return str.toLowerCase().trim();
}

export default function StatsPage() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);
	const [query, setQuery] = useState('');
	const { links, isLoading, error } = useLinks();

	const sorted = useMemo(() => [...links].sort((a, b) => b.visits - a.visits), [links]);

	const filtered = useMemo(() => {
		const q = normalize(query);
		if (!q) return sorted;
		return sorted.filter(
			(l) => normalize(l.slug).includes(q) || normalize(l.original_url).includes(q),
		);
	}, [query, sorted]);

	if (!isAuthenticated) return <Navigate to="/" replace />;

	const maxVisits = Math.max(...sorted.map((l) => l.visits));
	const totalVisits = sorted.reduce((s, l) => s + l.visits, 0);

	if (isLoading) {
		return (
			<MainLayout>
				<div className="text-muted py-10">Загрузка...</div>
			</MainLayout>
		);
	}

	if (error) {
		return (
			<MainLayout>
				<div className="text-danger py-10">{error}</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<StatsHeader
				user={user}
				totalLinks={links.length}
				totalVisits={totalVisits}
				topSlug={sorted[0]?.slug ?? ''}
				query={query}
				setQuery={setQuery}
			/>

			<div className="flex flex-col gap-3">
				<StatsList links={filtered} query={query} maxVisits={maxVisits} />
			</div>
		</MainLayout>
	);
}
