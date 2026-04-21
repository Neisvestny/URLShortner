import type { Link } from '../types/link';
import type { Visit } from '../types/visit';
import { api } from './axios';

export const linksApi = {
	getMyLinks: () => api.get<{ links: Link[] }>('/links'),

	createLink: (original_url: string) => api.post<{ link: Link }>('/links', { original_url }),

	getLinkStats: (slug: string) =>
		api.get<{ link: Link; visits: Visit[] }>(`/links/${slug}/stats`),

	checkLinkExists: async (slug: string) => {
		try {
			await api.get(`/links/${slug}`);
			return true;
		} catch (e: any) {
			if (e.response?.status === 404) return false;
			throw e;
		}
	},
};
