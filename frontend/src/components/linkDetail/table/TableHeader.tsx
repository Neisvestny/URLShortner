import type { SortKey } from '../../../types/visitsTable';

type Props = {
	sortKey: SortKey;
	sortAsc: boolean;
	onSort: (key: SortKey) => void;
};

const LABELS: Record<SortKey, string> = {
	date: 'Дата',
	region: 'Регион',
	browser: 'Браузер',
	os: 'ОС',
};

export function TableHeader({ sortKey, sortAsc, onSort }: Props) {
	return (
		<tr className="border-b border-border bg-bg">
			{(['date', 'region', 'browser', 'os'] as SortKey[]).map((k) => (
				<th key={k} className="p-0">
					<button
						onClick={() => onSort(k)}
						className={`flex items-center px-3.5 py-2.5 text-xs uppercase tracking-wider cursor-pointer select-none bg-transparent border-none font-sans ${
							sortKey === k ? 'text-accent' : 'text-muted'
						}`}
					>
						{LABELS[k]}
						<svg
							width="10"
							height="10"
							viewBox="0 0 10 10"
							fill="none"
							className="ml-1"
							style={{ opacity: sortKey === k ? 1 : 0.25 }}
						>
							<path
								d={sortAsc && sortKey === k ? 'M5 2L9 8H1L5 2Z' : 'M5 8L1 2H9L5 8Z'}
								fill="currentColor"
							/>
						</svg>
					</button>
				</th>
			))}
			<th className="px-3.5 py-2.5 text-xs text-muted uppercase tracking-wider text-left">
				IP
			</th>
		</tr>
	);
}
