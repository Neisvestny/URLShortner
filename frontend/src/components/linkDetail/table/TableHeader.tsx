import type { SortKey } from '../../../types/visitsTable';

interface Props {
	sortKey: SortKey;
	sortAsc: boolean;
	onSort: (key: SortKey) => void;
}

export function TableHeader({ sortKey, sortAsc, onSort }: Props) {
	const thStyle = (k: SortKey): React.CSSProperties => ({
		padding: '10px 14px',
		fontSize: 11,
		color: sortKey === k ? '#b48cff' : 'var(--muted)',
		textTransform: 'uppercase',
		letterSpacing: '0.05em',
		cursor: 'pointer',
		whiteSpace: 'nowrap',
		userSelect: 'none',
		textAlign: 'left',
		background: 'none',
		border: 'none',
		fontFamily: 'inherit',
		display: 'flex',
		alignItems: 'center',
	});

	const SortIcon = ({ k }: { k: SortKey }) => (
		<svg
			width="10"
			height="10"
			viewBox="0 0 10 10"
			fill="none"
			style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.25 }}
		>
			<path
				d={sortAsc && sortKey === k ? 'M5 2L9 8H1L5 2Z' : 'M5 8L1 2H9L5 8Z'}
				fill="currentColor"
			/>
		</svg>
	);

	return (
		<tr
			style={{
				borderBottom: '0.5px solid var(--border)',
				background: 'var(--bg)',
			}}
		>
			{(['date', 'region', 'browser', 'os'] as SortKey[]).map((k) => (
				<th key={k} style={{ padding: 0 }}>
					<button style={thStyle(k)} onClick={() => onSort(k)}>
						{
							{
								date: 'Дата',
								region: 'Регион',
								browser: 'Браузер',
								os: 'ОС',
							}[k]
						}
						<SortIcon k={k} />
					</button>
				</th>
			))}
			<th
				style={{
					padding: '10px 14px',
					fontSize: 11,
					color: 'var(--muted)',
					textTransform: 'uppercase',
					letterSpacing: '0.05em',
					textAlign: 'left',
				}}
			>
				IP
			</th>
		</tr>
	);
}
