export default function highlight(text: string, query: string) {
	if (!query.trim()) return <>{text}</>;

	const regex = new RegExp(`(${query})`, 'ig');
	const parts = text.split(regex);

	return (
		<>
			{parts.map((part, i) =>
				part.toLowerCase() === query.toLowerCase() ? (
					<mark
						key={i}
						style={{
							background: 'rgba(180,140,255,0.25)',
							color: '#d4b8ff',
							borderRadius: 3,
							padding: '0 1px',
						}}
					>
						{part}
					</mark>
				) : (
					part
				),
			)}
		</>
	);
}
