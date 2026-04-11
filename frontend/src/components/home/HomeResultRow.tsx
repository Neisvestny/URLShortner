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
					color: '#888',
					marginBottom: 6,
				}}
			>
				{label}
			</p>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<div
					style={{
						flex: 1,
						background: '#0a0a0a',
						border: '1px solid rgba(255,255,255,0.08)',
						borderRadius: 8,
						padding: '9px 12px',
						fontSize: 13,
						color: muted ? '#888' : '#ededed',
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
						background: hovered ? '#222' : '#1a1a1a',
						border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
						borderRadius: 8,
						padding: '9px 14px',
						fontSize: 13,
						color: copied ? '#22c55e' : '#ededed',
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
