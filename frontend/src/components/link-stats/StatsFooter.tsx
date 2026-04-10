export default function StatsFooter({ filteredLength, dataLength }) {
	return (
		<p
			style={{
				marginTop: 12,
				fontSize: 12,
				color: "#333",
				textAlign: "center",
			}}
		>
			{filteredLength} из {dataLength} записей
		</p>
	);
}
