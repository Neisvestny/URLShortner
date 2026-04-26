import { useState } from 'react';
import type { Visit } from '../../types/visit';
import type { SortKey } from '../../types/visitsTable';
import StatsFooter from './StatsFooter';
import { Pagination } from './table/Pagination';
import { TableHeader } from './table/TableHeader';
import { VisitRow } from './table/VisitRow';

type Props = {
	data: Visit[];
	sortKey: SortKey;
	sortAsc: boolean;
	setSortKey: (key: SortKey) => void;
	setSortAsc: React.Dispatch<React.SetStateAction<boolean>>;
	totalCount: number;
};

export default function VisitsTable({
	data,
	sortKey,
	sortAsc,
	setSortKey,
	setSortAsc,
	totalCount,
}: Props) {
	const [page, setPage] = useState(1);
	const PAGE_SIZE = 50;
	const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
	const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const handlePageChange = (next: number) => setPage(Math.max(1, Math.min(totalPages, next)));

	function toggleSort(key: SortKey) {
		if (sortKey === key) setSortAsc((v) => !v);
		else {
			setSortKey(key);
			setSortAsc(false);
		}
		setPage(1);
	}

	return (
		<>
			<div className="rounded-card border border-border overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<TableHeader sortKey={sortKey} sortAsc={sortAsc} onSort={toggleSort} />
						</thead>
						<tbody>
							{paginatedData.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="py-12 px-6 text-center text-muted text-sm"
									>
										Ничего не найдено
									</td>
								</tr>
							) : (
								paginatedData.map((v, i) => (
									<VisitRow
										key={v.id}
										visit={v}
										index={i}
										totalRows={paginatedData.length}
									/>
								))
							)}
						</tbody>
					</table>
				</div>
				<Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
			</div>
			<StatsFooter
				filteredLength={(page - 1) * PAGE_SIZE + paginatedData.length}
				dataLength={totalCount}
			/>
		</>
	);
}
