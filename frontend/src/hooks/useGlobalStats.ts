import { useEffect, useState } from 'react';
import { statsApi, type GlobalStats } from '../api/statsApi';

export function useGlobalStats() {
	const [stats, setStats] = useState<GlobalStats | null>(null);

	useEffect(() => {
		statsApi
			.getGlobal()
			.then(({ data }) => setStats(data))
			.catch(() => {});
	}, []);

	return stats;
}
