import { api } from './axios';

export interface GlobalStats {
	total_links: number;
	total_visits: number;
	total_countries: number;
}

export const statsApi = {
	getGlobal: () => api.get<GlobalStats>('/stats'),
};
