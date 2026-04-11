type Props = {
	value: string;
	onChange: (v: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
	return (
		<div style={{ position: 'relative', marginBottom: 16 }}>
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#555"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				style={{
					position: 'absolute',
					left: 14,
					top: '50%',
					transform: 'translateY(-50%)',
					pointerEvents: 'none',
				}}
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="text"
				placeholder="Поиск по IP, региону, браузеру, ОС…"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				style={{
					width: '100%',
					boxSizing: 'border-box',
					padding: '11px 16px 11px 40px',
					borderRadius: 11,
					background: 'rgba(255,255,255,0.04)',
					border: '1px solid rgba(255,255,255,0.09)',
					color: '#ededed',
					fontSize: 14,
					outline: 'none',
					transition: 'border-color 0.15s',
					fontFamily: 'inherit',
				}}
				onFocus={(e) =>
					(e.currentTarget.style.borderColor =
						'rgba(180,140,255,0.4)')
				}
				onBlur={(e) =>
					(e.currentTarget.style.borderColor =
						'rgba(255,255,255,0.09)')
				}
			/>
			{value && (
				<button
					onClick={() => onChange('')}
					style={{
						position: 'absolute',
						right: 12,
						top: '50%',
						transform: 'translateY(-50%)',
						background: 'none',
						border: 'none',
						color: '#555',
						cursor: 'pointer',
						padding: 4,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<svg
						width="13"
						height="13"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			)}
		</div>
	);
}
