type Props = { value: string; onChange: (v: string) => void };

export default function SearchInput({ value, onChange }: Props) {
	return (
		<div className="relative mb-4">
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--muted)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="text"
				placeholder="Поиск по IP, региону, браузеру, ОС…"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full box-border py-2.5 pl-10 pr-4 rounded-lg bg-surface border border-border text-fg text-sm outline-none transition-colors font-sans placeholder:text-muted focus:border-accent/40"
			/>
			{value && (
				<button
					onClick={() => onChange('')}
					className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-muted cursor-pointer p-1 flex items-center"
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
