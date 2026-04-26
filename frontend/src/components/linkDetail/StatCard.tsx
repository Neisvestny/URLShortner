type Props = {
	title: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
};

export default function StatCard({ title, children, style }: Props) {
	return (
		<div
			className="p-5 rounded-card bg-surface border border-border flex-1 min-w-0"
			style={style}
		>
			<p className="m-0 mb-4 text-xs text-muted uppercase tracking-wider">{title}</p>
			{children}
		</div>
	);
}
