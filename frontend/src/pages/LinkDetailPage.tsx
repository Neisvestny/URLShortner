import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated } from '../features/auth/selectors';
import { useAppSelector } from '../hooks/storeHooks';
import { useLinkStats } from '../hooks/useLinkStats';

import DonutChart from '../components/linkDetail/DonutChart';
import MiniBar from '../components/linkDetail/MiniBar';
import SearchInput from '../components/linkDetail/SearchInput';
import StatCard from '../components/linkDetail/StatCard';
import StatsHeader from '../components/linkDetail/StatsHeader';
import VisitsTable from '../components/linkDetail/VisitsTable';
import { BROWSER_COLORS, OS_COLORS } from '../constants/colors';
import MainLayout from '../layouts/MainLayout';
import count from '../utils/count';

type SortKey = 'date' | 'region' | 'browser' | 'os';

interface Props {
	code: string;
}

export default function LinkStatsPage({ code }: Props) {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const { link, visits, isLoading, error } = useLinkStats(code);

	const [search, setSearch] = useState('');
	const [sortKey, setSortKey] = useState<SortKey>('date');
	const [sortAsc, setSortAsc] = useState(false);

	const browsers = count(visits.map((v) => v.browser ?? 'Неизвестно'));
	const oses = count(visits.map((v) => v.os ?? 'Неизвестно'));
	const regions = count(visits.map((v) => v.region ?? 'Неизвестно'));
	const maxRegion = regions[0]?.n ?? 1;

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		return visits
			.filter(
				(v) =>
					!q ||
					v.ip?.includes(q) ||
					v.region?.toLowerCase().includes(q) ||
					v.browser?.toLowerCase().includes(q) ||
					v.os?.toLowerCase().includes(q),
			)
			.sort((a, b) => {
				let cmp = 0;
				if (sortKey === 'date')
					cmp =
						new Date(a.visited_at).getTime() -
						new Date(b.visited_at).getTime();
				if (sortKey === 'region')
					cmp = (a.region ?? '').localeCompare(b.region ?? '');
				if (sortKey === 'browser')
					cmp = (a.browser ?? '').localeCompare(b.browser ?? '');
				if (sortKey === 'os')
					cmp = (a.os ?? '').localeCompare(b.os ?? '');
				return sortAsc ? cmp : -cmp;
			});
	}, [search, sortKey, sortAsc, visits]);

	if (!isAuthenticated) return <Navigate to="/" replace />;

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
			<StatsHeader
				code={code}
				total={visits.length}
				originalUrl={link?.original_url}
			/>

			<div
				style={{
					display: 'flex',
					gap: 12,
					marginBottom: 12,
					flexWrap: 'wrap',
				}}
			>
				<StatCard title="Браузеры" style={{ flex: 1, minWidth: 260 }}>
					<DonutChart data={browsers} colors={BROWSER_COLORS} />
				</StatCard>
				<StatCard title="ОС" style={{ flex: 1, minWidth: 260 }}>
					<DonutChart data={oses} colors={OS_COLORS} />
				</StatCard>
				<StatCard title="Регионы" style={{ flex: 1, minWidth: 260 }}>
					{regions.slice(0, 5).map((r) => (
						<MiniBar
							key={r.key}
							label={r.key}
							n={r.n}
							max={maxRegion}
							color="#7c7cff"
						/>
					))}
				</StatCard>
			</div>

			<SearchInput value={search} onChange={setSearch} />

			<VisitsTable
				data={filtered}
				sortKey={sortKey}
				sortAsc={sortAsc}
				setSortKey={setSortKey}
				setSortAsc={setSortAsc}
				totalCount={visits.length}
			/>
		</MainLayout>
	);
}
