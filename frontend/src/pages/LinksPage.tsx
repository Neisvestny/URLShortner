import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated, selectUser } from '../features/auth/selectors';
import { useAppSelector } from '../hooks/storeHooks';

import StatsHeader from '../components/links/LinkHeader';
import StatsList from '../components/links/LinkList';
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

	const sorted = useMemo(() => {
		return [...links].sort((a, b) => b.visits - a.visits);
	}, [links]);

	const filtered = useMemo(() => {
		const q = normalize(query);
		if (!q) return sorted;

		return sorted.filter((l) => {
			return (
				normalize(l.slug).includes(q) ||
				normalize(l.original_url).includes(q)
			);
		});
	}, [query, sorted]);

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	const maxVisits = Math.max(...sorted.map((l) => l.visits));
	const totalVisits = sorted.reduce((s, l) => s + l.visits, 0);

	if (isLoading) {
		return (
			<MainLayout>
				<div style={{ color: '#555', padding: '40px 0' }}>
					Загрузка...
				</div>
			</MainLayout>
		);
	}

	if (error) {
		return (
			<MainLayout>
				<div style={{ color: '#f87171', padding: '40px 0' }}>
					{error}
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			{/* Header */}
			<StatsHeader
				user={user}
				totalLinks={links.length}
				totalVisits={totalVisits}
				topSlug={sorted[0]?.slug ?? ''}
				query={query}
				setQuery={setQuery}
			/>

			{/* Link cards */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 12,
				}}
			>
				<StatsList
					links={filtered}
					query={query}
					maxVisits={maxVisits}
				/>
			</div>
		</MainLayout>
	);
}
