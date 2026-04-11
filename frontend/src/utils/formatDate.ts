export default function formatDate(iso: string | null) {
	if (!iso) return '—';
	const d = new Date(iso);
	return d.toLocaleString('ru', {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	});
}
