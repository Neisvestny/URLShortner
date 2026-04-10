import { Navigate } from "react-router-dom";
import { useState, useMemo } from "react";

import { useAppSelector } from "../hooks/storeHooks";
import { selectIsAuthenticated } from "../features/auth/selectors";

import MainLayout from "../layouts/MainLayout";
import StatsHeader from "../components/link-stats/StatsHeader";
import SearchInput from "../components/link-stats/SearchInput";
import StatCard from "../components/link-stats/StatCard";
import VisitsTable from "../components/link-stats/VisitsTable";
import DonutChart from "../components/link-stats/DonutChart";
import MiniBar from "../components/link-stats/MiniBar";
import count from "../utils/count";
import StatsFooter from "../components/link-stats/StatsFooter";
import { BROWSER_COLORS, MOCK_VISITS, OS_COLORS } from "../utils/config";

type SortKey = "date" | "region" | "browser" | "os";

export default function LinkStatsPage({ code }) {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	// const user = useAppSelector(selectUser);

	const [search, setSearch] = useState("");
	const [sortKey, setSortKey] = useState<SortKey>("date");
	const [sortAsc, setSortAsc] = useState(false);

	const browsers = count(MOCK_VISITS.map((v) => v.browser));
	const oses = count(MOCK_VISITS.map((v) => v.os));
	const regions = count(MOCK_VISITS.map((v) => v.region));
	const maxRegion = regions[0]?.n ?? 1;

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		return MOCK_VISITS.filter(
			(v) =>
				!q ||
				v.ip.includes(q) ||
				v.region.toLowerCase().includes(q) ||
				v.browser.toLowerCase().includes(q) ||
				v.os.toLowerCase().includes(q),
		).sort((a, b) => {
			let cmp = 0;
			if (sortKey === "date")
				cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
			if (sortKey === "region") cmp = a.region.localeCompare(b.region);
			if (sortKey === "browser") cmp = a.browser.localeCompare(b.browser);
			if (sortKey === "os") cmp = a.os.localeCompare(b.os);
			return sortAsc ? cmp : -cmp;
		});
	}, [search, sortKey, sortAsc]);

	if (!isAuthenticated) return <Navigate to="/" replace />;

	return (
		<MainLayout>
			{/* Header */}
			<StatsHeader code={code} total={MOCK_VISITS.length} />

			{/* Charts row */}
			<div
				style={{
					display: "flex",
					gap: 12,
					marginBottom: 12,
					flexWrap: "wrap",
				}}
			>
				<StatCard title="Браузеры">
					<DonutChart data={browsers} colors={BROWSER_COLORS} />
				</StatCard>
				<StatCard title="ОС">
					<DonutChart data={oses} colors={OS_COLORS} />
				</StatCard>
				<StatCard title="Регионы">
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

			{/* Search */}
			<SearchInput value={search} onChange={setSearch} />

			{/* Table */}
			<VisitsTable
				data={filtered}
				sortKey={sortKey}
				sortAsc={sortAsc}
				setSortKey={setSortKey}
				setSortAsc={setSortAsc}
			/>

			{/* Footer */}
			<StatsFooter
				filteredLength={filtered.length}
				dataLength={MOCK_VISITS.length}
			/>
		</MainLayout>
	);
}
