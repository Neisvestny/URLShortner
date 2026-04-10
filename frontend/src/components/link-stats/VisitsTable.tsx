const FLAG: Record<string, string> = {
	BY: "🇧🇾",
	RU: "🇷🇺",
	PL: "🇵🇱",
	DE: "🇩🇪",
	UA: "🇺🇦",
	NL: "🇳🇱",
	CZ: "🇨🇿",
	US: "🇺🇸",
	GB: "🇬🇧",
};

const BROWSER_COLORS: Record<string, string> = {
	Chrome: "#7c7cff",
	Firefox: "#ff9f55",
	Safari: "#55d4ff",
	Edge: "#55ffb8",
	Opera: "#ff5577",
};

const OS_COLORS: Record<string, string> = {
	Windows: "#7c7cff",
	macOS: "#b48cff",
	Linux: "#55ffb8",
	Android: "#ff9f55",
	iOS: "#55d4ff",
};

function formatDate(iso: string) {
	const d = new Date(iso);
	return d.toLocaleString("ru", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	});
}

type SortKey = "date" | "region" | "browser" | "os";

export default function VisitsTable({
	data,
	sortKey,
	sortAsc,
	setSortKey,
	setSortAsc,
}) {
	const thStyle = (k: SortKey): React.CSSProperties => ({
		padding: "10px 14px",
		fontSize: 11,
		color: sortKey === k ? "#b48cff" : "#555",
		textTransform: "uppercase",
		letterSpacing: "0.05em",
		cursor: "pointer",
		whiteSpace: "nowrap",
		userSelect: "none",
		textAlign: "left",
		background: "none",
		border: "none",
		fontFamily: "inherit",
		display: "flex",
		alignItems: "center",
	});

	function toggleSort(key: SortKey) {
		if (sortKey === key) setSortAsc((v) => !v);
		else {
			setSortKey(key);
			setSortAsc(false);
		}
	}

	const SortIcon = ({ k }: { k: SortKey }) => (
		<svg
			width="10"
			height="10"
			viewBox="0 0 10 10"
			fill="none"
			style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.25 }}
		>
			<path
				d={
					sortAsc && sortKey === k
						? "M5 2L9 8H1L5 2Z"
						: "M5 8L1 2H9L5 8Z"
				}
				fill="currentColor"
			/>
		</svg>
	);

	return (
		<div
			style={{
				borderRadius: 14,
				border: "1px solid rgba(255,255,255,0.07)",
				overflow: "hidden",
			}}
		>
			<div style={{ overflowX: "auto" }}>
				<table
					style={{
						width: "100%",
						borderCollapse: "collapse",
						fontSize: 13,
					}}
				>
					<thead>
						<tr
							style={{
								borderBottom:
									"1px solid rgba(255,255,255,0.07)",
								background: "rgba(255,255,255,0.02)",
							}}
						>
							{(
								["date", "region", "browser", "os"] as SortKey[]
							).map((k) => (
								<th key={k} style={{ padding: 0 }}>
									<button
										style={thStyle(k)}
										onClick={() => toggleSort(k)}
									>
										{
											{
												date: "Дата",
												region: "Регион",
												browser: "Браузер",
												os: "ОС",
											}[k]
										}
										<SortIcon k={k} />
									</button>
								</th>
							))}
							<th
								style={{
									padding: "10px 14px",
									fontSize: 11,
									color: "#555",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
									textAlign: "left",
								}}
							>
								IP
							</th>
						</tr>
					</thead>
					<tbody>
						{data.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									style={{
										padding: "48px 24px",
										textAlign: "center",
										color: "#444",
										fontSize: 14,
									}}
								>
									Ничего не найдено
								</td>
							</tr>
						) : (
							data.map((v, i) => (
								<tr
									key={v.id}
									style={{
										borderBottom:
											i < data.length - 1
												? "1px solid rgba(255,255,255,0.05)"
												: "none",
										transition: "background 0.12s",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.background =
											"rgba(255,255,255,0.03)")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background =
											"transparent")
									}
								>
									<td
										style={{
											padding: "13px 14px",
											color: "#888",
											whiteSpace: "nowrap",
										}}
									>
										{formatDate(v.date)}
									</td>
									<td
										style={{
											padding: "13px 14px",
											whiteSpace: "nowrap",
										}}
									>
										<span style={{ marginRight: 6 }}>
											{FLAG[v.country] ?? "🌐"}
										</span>
										{v.region}
									</td>
									<td
										style={{
											padding: "13px 14px",
											whiteSpace: "nowrap",
										}}
									>
										<span
											style={{
												display: "inline-flex",
												alignItems: "center",
												gap: 6,
											}}
										>
											<span
												style={{
													width: 7,
													height: 7,
													borderRadius: 99,
													background:
														BROWSER_COLORS[
															v.browser
														] ?? "#444",
													flexShrink: 0,
												}}
											/>
											{v.browser}
											<span
												style={{
													color: "#555",
													fontSize: 11,
												}}
											>
												{v.browserVersion}
											</span>
										</span>
									</td>
									<td
										style={{
											padding: "13px 14px",
											whiteSpace: "nowrap",
										}}
									>
										<span
											style={{
												display: "inline-flex",
												alignItems: "center",
												gap: 6,
											}}
										>
											<span
												style={{
													width: 7,
													height: 7,
													borderRadius: 99,
													background:
														OS_COLORS[v.os] ??
														"#444",
													flexShrink: 0,
												}}
											/>
											{v.os}
										</span>
									</td>
									<td
										style={{
											padding: "13px 14px",
											color: "#555",
											fontFamily: "monospace",
											fontSize: 12,
										}}
									>
										{v.ip}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
