import { Navigate } from "react-router-dom";
import { useState, useMemo } from "react";

import { useAppSelector } from "../hooks/storeHooks";
import { selectIsAuthenticated, selectUser } from "../features/auth/selectors";

import StatsHeader from "../components/stats/StatsHeader";
import StatsList from "../components/stats/StatsList";
import MainLayout from "../layouts/MainLayout";

const MOCK_LINKS = [
	{
		id: "1",
		slug: "asd123",
		originalUrl: "https://github.com/ruslan/url-shortener-project",
		visits: 1284,
		createdAt: "2025-03-12",
		lastVisit: "2 мин назад",
	},
	{
		id: "2",
		slug: "sdf234",
		originalUrl: "https://ruslan.dev/portfolio/main-page",
		visits: 847,
		createdAt: "2025-02-28",
		lastVisit: "1 ч назад",
	},
	{
		id: "3",
		slug: "dfg345",
		originalUrl: "https://figma.com/file/xKq92mNpA/design-system-v2",
		visits: 320,
		createdAt: "2025-03-01",
		lastVisit: "вчера",
	},
	{
		id: "4",
		slug: "fgh456",
		originalUrl:
			"https://drive.google.com/file/d/1xZkLmP9/ruslan-cv-2025.pdf",
		visits: 93,
		createdAt: "2025-01-15",
		lastVisit: "3 дня назад",
	},
];

function normalize(str: string) {
	return str.toLowerCase().trim();
}

export default function StatsPage() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);
	const [query, setQuery] = useState("");

	const sorted = useMemo(() => {
		return [...MOCK_LINKS].sort((a, b) => b.visits - a.visits);
	}, []);

	const filtered = useMemo(() => {
		const q = normalize(query);
		if (!q) return sorted;

		return sorted.filter((l) => {
			const slug = normalize(l.slug);
			const url = normalize(l.originalUrl);

			return slug.includes(q) || url.includes(q);
		});
	}, [query, sorted]);

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	const maxVisits = Math.max(...sorted.map((l) => l.visits));
	const totalVisits = sorted.reduce((s, l) => s + l.visits, 0);

	return (
		<MainLayout>
			{/* Header */}
			<StatsHeader
				user={user}
				totalLinks={MOCK_LINKS.length}
				totalVisits={totalVisits}
				topSlug={sorted[0]?.slug ?? ""}
				query={query}
				setQuery={setQuery}
			/>

			{/* Link cards */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
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
