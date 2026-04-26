import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: Props) {
	if (totalPages <= 1) return null;

	const btn = (disabled: boolean) =>
		`size-9 rounded-lg border border-border bg-surface flex items-center justify-center transition-all select-none ${
			disabled ? 'text-muted cursor-not-allowed opacity-40' : 'text-accent cursor-pointer'
		}`;

	return (
		<div className="flex justify-center items-center gap-2 p-4 border-t border-border bg-bg">
			<button
				className={btn(page === 1)}
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
			>
				<ChevronLeft size={18} strokeWidth={2} />
			</button>
			<span className="text-sm text-muted flex items-center px-4 h-9">
				{page} / {totalPages}
			</span>
			<button
				className={btn(page === totalPages)}
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}
			>
				<ChevronRight size={18} strokeWidth={2} />
			</button>
		</div>
	);
}
