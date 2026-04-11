export interface Visit {
	id: string;
	ip: string;
	browser: string | null;
	browser_version: string | null;
	os: string | null;
	country: string | null;
	region: string | null;
	visited_at: string;
}
