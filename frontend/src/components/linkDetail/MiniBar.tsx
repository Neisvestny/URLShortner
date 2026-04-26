type Props = {
	label: string;
	n: number;
	max: number;
	color: string;
};

export default function MiniBar({ label, n, max, color }: Props) {
	return (
		<div className="flex items-center gap-2.5 mb-2">
			<span className="text-xs text-muted w-20 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
				{label}
			</span>
			<div className="flex-1 h-1 rounded-full bg-border">
				<div
					className="h-full rounded-full transition-[width] duration-500"
					style={{ width: `${(n / max) * 100}%`, background: color }}
				/>
			</div>
			<span className="text-xs text-muted opacity-60 w-6 text-right shrink-0">{n}</span>
		</div>
	);
}
