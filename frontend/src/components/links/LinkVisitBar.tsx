type Props = { visits: number; max: number };

export default function VisitBar({ visits, max }: Props) {
	return (
		<div className="h-[3px] rounded-full bg-border overflow-hidden mt-3">
			<div
				className="h-full rounded-full bg-gradient-to-r from-accent-dim to-accent transition-[width] duration-500"
				style={{ width: `${Math.round((visits / max) * 100)}%` }}
			/>
		</div>
	);
}
