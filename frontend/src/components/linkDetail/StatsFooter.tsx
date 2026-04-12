interface Props {
	filteredLength: number;
	dataLength: number;
}

export default function StatsFooter({ filteredLength, dataLength }: Props) {
	return (
		<p
			style={{
				marginTop: 12,
				fontSize: 12,
				color: 'var(--muted)',
				textAlign: 'center',
				opacity: 0.6,
			}}
		>
			{filteredLength} из {dataLength} записей
		</p>
	);
}
