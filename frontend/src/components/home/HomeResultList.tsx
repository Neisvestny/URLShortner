import { useNavigate } from 'react-router-dom';
import type { CopyKey, ShortenResult } from '../../types/shortenResult.ts';
import ResultRow from './HomeResultRow';

type CopiedState = Record<CopyKey, boolean>;

type ResultListProps = {
	result: ShortenResult;
	copied: CopiedState;
	showStats: boolean;
	onCopy: (text: string, key: CopyKey) => void;
};

export default function ResultList({
	result,
	copied,
	onCopy,
	showStats,
}: ResultListProps) {
	const navigate = useNavigate();

	return (
		<div
			style={{
				borderTop: '0.5px solid var(--border)',
				paddingTop: 16,
				marginTop: 4,
				display: 'flex',
				flexDirection: 'column',
				gap: 10,
				animation: 'fadeIn 0.25s ease',
			}}
		>
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
				<p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
					<button
						onClick={() => navigate('/login')}
						style={{
							background: 'none',
							border: 'none',
							color: 'var(--fg)',
							cursor: 'pointer',
							fontSize: 12,
							fontFamily: 'inherit',
							padding: 0,
							textDecoration: 'underline',
							textDecorationColor: 'var(--border-hover)',
							textUnderlineOffset: 3,
						}}
					>
						Войдите
					</button>{' '}
					чтобы видеть статистику переходов
				</p>
			)}
		</div>
	);
}
