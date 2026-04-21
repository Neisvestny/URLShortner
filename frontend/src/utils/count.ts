export default function count<T extends string>(arr: T[]): { key: T; n: number }[] {
	const map = new Map<T, number>();
	arr.forEach((v) => map.set(v, (map.get(v) ?? 0) + 1));
	return [...map.entries()].map(([key, n]) => ({ key, n })).sort((a, b) => b.n - a.n);
}
