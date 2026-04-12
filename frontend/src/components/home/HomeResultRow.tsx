import { useState } from 'react';

type ResultRowProps = {
	label: string;
	value: string;
	copied: boolean;
	onCopy: () => void;
	muted?: boolean;
};

export default function ResultRow({
	label,
	value,
	copied,
	onCopy,
	muted,
}: ResultRowProps) {
	const [hovered, setHovered] = useState(false);
	return (
		<div>
			<p
				style={{
					fontSize: 11,
					textTransform: 'uppercase',
					letterSpacing: '0.7px',
					color: 'var(--muted)',
					marginBottom: 6,
				}}
			>
				{label}
			</p>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<div
					style={{
						flex: 1,
						background: 'var(--bg)',
						border: '0.5px solid var(--border)',
						borderRadius: 8,
						padding: '9px 12px',
						fontSize: 13,
						color: muted ? 'var(--muted)' : 'var(--fg)',
						fontFamily: "'SF Mono', 'Fira Code', monospace",
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				>
					{value}
				</div>
				<button
					onClick={onCopy}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					style={{
						background: copied
							? 'rgba(34,197,94,0.06)'
							: hovered
								? 'var(--surface-hover)'
								: 'var(--surface)',
						border: `0.5px solid ${
							copied
								? 'rgba(34,197,94,0.25)'
								: hovered
									? 'var(--border-hover)'
									: 'var(--border)'
						}`,
						borderRadius: 8,
						padding: '9px 14px',
						fontSize: 13,
						color: copied ? '#22c55e' : 'var(--fg)',
						cursor: 'pointer',
						fontFamily: 'inherit',
						whiteSpace: 'nowrap',
						flexShrink: 0,
						transition: 'all 0.15s',
					}}
				>
					{copied ? 'Скопировано!' : 'Копировать'}
				</button>
			</div>
		</div>
	);
}
