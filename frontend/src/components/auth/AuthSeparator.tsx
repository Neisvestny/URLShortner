export default function AuthSeparator() {
	return (
		<div className="flex items-center gap-3 my-6">
			<div className="flex-1 h-px bg-border bg-surface" />
			<span className="text-xs text-muted opacity-60">или</span>
			<div className="flex-1 h-px bg-border bg-surface" />
		</div>
	);
}
