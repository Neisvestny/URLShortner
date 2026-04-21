import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
	const paginationButtonStyle = (disabled: boolean): React.CSSProperties => ({
		width: 36,
		height: 36,
		borderRadius: 8,
		border: '0.5px solid var(--border)',
		background: 'var(--surface)',
		color: disabled ? 'var(--muted)' : '#b48cff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all 0.12s ease',
		userSelect: 'none',
		opacity: disabled ? 0.4 : 1,
	});

	const paginationTextStyle: React.CSSProperties = {
		fontSize: 13,
		color: 'var(--muted)',
		display: 'flex',
		alignItems: 'center',
		padding: '0 16px',
		height: 36,
		fontFamily: 'inherit',
	};

	return totalPages > 1 ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 8,
				padding: '16px 20px',
				borderTop: '0.5px solid var(--border)',
				background: 'var(--bg)',
			}}
		>
			<button
				style={paginationButtonStyle(page === 1)}
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
			>
				<ChevronLeft size={18} strokeWidth={2} />
			</button>

			<span style={paginationTextStyle}>
				{page} / {totalPages}
			</span>

			<button
				style={paginationButtonStyle(page === totalPages)}
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}
			>
				<ChevronRight size={18} strokeWidth={2} />
			</button>
		</div>
	) : null;
}
