export interface Link {
	id: string;
	slug: string;
	original_url: string;
	created_at: string;
	visits: number;
	last_visit: string | null;
}
