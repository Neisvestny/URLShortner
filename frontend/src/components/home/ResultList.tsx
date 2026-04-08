import type { CopyKey, Result } from "../../types/result";
import ResultRow from "./ResultRow";

type CopiedState = Record<CopyKey, boolean>;

type ResultListProps = {
	result: Result;
	copied: CopiedState;
	onCopy: (text: string, key: CopyKey) => void;
};

export default function ResultList({
	result,
	copied,
	onCopy,
}: ResultListProps) {
	return (
		<div
			style={{
				borderTop: "1px solid rgba(255,255,255,0.08)",
				paddingTop: 16,
				marginTop: 4,
				display: "flex",
				flexDirection: "column",
				gap: 10,
				animation: "fadeIn 0.25s ease",
			}}
		>
			<ResultRow
				label="Короткая ссылка"
				value={result.shortLink}
				copied={copied.short}
				onCopy={() => onCopy(result.shortLink, "short")}
			/>
			<ResultRow
				label="Ссылка на статистику"
				value={result.statsLink}
				copied={copied.stats}
				onCopy={() => onCopy(result.statsLink, "stats")}
				muted
			/>
		</div>
	);
}
