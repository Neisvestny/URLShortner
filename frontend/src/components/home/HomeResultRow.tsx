import { useState } from 'react';

type Props = {
	label: string;
	value: string;
	copied: boolean;
	onCopy: () => void;
	muted?: boolean;
};

export default function ResultRow({ label, value, copied, onCopy, muted }: Props) {
	const [hovered, setHovered] = useState(false);

	return (
		<div>
			<p className="text-xs uppercase tracking-wider text-muted mb-1.5">{label}</p>
			<div className="flex gap-2 items-center">
				<div
					className="flex-1 bg-bg border border-border rounded-lg px-3 py-2.5 text-sm font-mono overflow-hidden text-ellipsis whitespace-nowrap text-fg opacity-90"
					style={{ color: muted ? 'var(--muted)' : undefined }}
				>
					{value}
				</div>
				<button
					onClick={onCopy}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					className={`px-3.5 py-2.5 rounded-lg text-sm font-sans whitespace-nowrap shrink-0 border transition-all cursor-pointer ${
						copied
							? 'bg-green-500/5 border-green-500/25 text-green-500'
							: hovered
								? 'bg-surface-hover border-border-hover text-fg'
								: 'bg-surface border-border text-fg'
					}`}
				>
					{copied ? 'Скопировано!' : 'Копировать'}
				</button>
			</div>
		</div>
	);
}
