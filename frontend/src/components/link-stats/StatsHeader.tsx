type Props = {
	code: string;
	total: number;
};

export default function StatsHeader({ code, total }: Props) {
	return (
		<div style={{ marginBottom: 36 }}>
			<p
				style={{
					color: "#555",
					fontSize: 13,
					margin: "0 0 8px",
					letterSpacing: "0.05em",
					textTransform: "uppercase",
				}}
			>
				статистика · /{code}
			</p>
			<h1
				style={{
					fontSize: "clamp(26px, 4vw, 38px)",
					fontWeight: 500,
					letterSpacing: "-1.5px",
					margin: "0 0 6px",
					lineHeight: 1.1,
				}}
			>
				Переходы
			</h1>
			<p style={{ margin: 0, fontSize: 13, color: "#555" }}>
				Всего {total} визитов · данные обновляются в реальном времени
			</p>
		</div>
	);
}
