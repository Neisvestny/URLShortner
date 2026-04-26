type Props = {
	filteredLength: number;
	dataLength: number;
};

export default function StatsFooter({ filteredLength, dataLength }: Props) {
	return (
		<p className="mt-3 text-xs text-muted text-center opacity-60">
			{filteredLength} из {dataLength} записей
		</p>
	);
}
