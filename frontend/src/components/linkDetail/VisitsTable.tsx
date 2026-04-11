import { useState } from 'react';
import type { Visit } from '../../types/visit';
import type { SortKey } from '../../types/visitsTable';
import StatsFooter from './StatsFooter';
import { Pagination } from './table/Pagination';
import { TableHeader } from './table/TableHeader';
import { VisitRow } from './table/VisitRow';

interface Props {
	data: Visit[];
	sortKey: SortKey;
	sortAsc: boolean;
	setSortKey: (key: SortKey) => void;
	setSortAsc: React.Dispatch<React.SetStateAction<boolean>>;
	totalCount: number;
}

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

	const handlePageChange = (next: number) => {
		setPage(Math.max(1, Math.min(totalPages, next)));
	};

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
			<div
				style={{
					borderRadius: 14,
					border: '1px solid rgba(255,255,255,0.07)',
					overflow: 'hidden',
				}}
			>
				<div style={{ overflowX: 'auto' }}>
					<table
						style={{
							width: '100%',
							borderCollapse: 'collapse',
							fontSize: 13,
						}}
					>
						<thead>
							<TableHeader
								sortKey={sortKey}
								sortAsc={sortAsc}
								onSort={toggleSort}
							/>
						</thead>
						<tbody>
							{paginatedData.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										style={{
											padding: '48px 24px',
											textAlign: 'center',
											color: '#444',
											fontSize: 14,
										}}
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
				<Pagination
					page={page}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
			<StatsFooter
				filteredLength={(page - 1) * PAGE_SIZE + paginatedData.length}
				dataLength={totalCount}
			/>
		</>
	);
}
