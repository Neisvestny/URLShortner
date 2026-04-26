import { useNavigate } from 'react-router-dom';
import type { CopyKey, ShortenResult } from '../../types/shortenResult.ts';
import ResultRow from './HomeResultRow';

type CopiedState = Record<CopyKey, boolean>;

type Props = {
	result: ShortenResult;
	copied: CopiedState;
	showStats: boolean;
	onCopy: (text: string, key: CopyKey) => void;
};

export default function ResultList({ result, copied, onCopy, showStats }: Props) {
	const navigate = useNavigate();

	return (
		<div className="border-border pt-4 mt-1 flex flex-col gap-2.5 animate-[fadeIn_0.25s_ease]">
			<ResultRow
				label="Короткая ссылка"
				value={result.shortLink}
				copied={copied.short}
				onCopy={() => onCopy(result.shortLink, 'short')}
			/>
			{showStats ? (
				<ResultRow
					label="Статистика"
					value={result.statsLink}
					copied={copied.stats}
					onCopy={() => onCopy(result.statsLink, 'stats')}
				/>
			) : (
				<p className="text-xs text-muted m-0">
					<button
						onClick={() => navigate('/login')}
						className="bg-transparent border-none text-fg cursor-pointer text-xs font-sans p-0 underline decoration-border-hover underline-offset-[3px]"
					>
						Войдите
					</button>{' '}
					чтобы видеть статистику переходов
				</p>
			)}
		</div>
	);
}
