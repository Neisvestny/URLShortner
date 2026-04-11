import LoadingDots from './HomeLoadingDots';

type Props = {
	value: string;
	error: boolean;
	loading: boolean;
	onChange: (v: string) => void;
	onSubmit: () => void;
};

export default function UrlInput({
	value,
	error,
	loading,
	onChange,
	onSubmit,
}: Props) {
	return (
		<div style={{ display: 'flex', gap: 8, marginBottom: error ? 8 : 0 }}>
			<input
				type="url"
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				onKeyDown={(e) => e.key === 'Enter' && !loading && onSubmit()}
				placeholder="https://очень-длинная-ссылка.com/которую/нужно/сократить"
				spellCheck={false}
				autoComplete="off"
				style={{
					flex: 1,
					background: '#1a1a1a',
					border: `1px solid ${error ? '#ff4444' : 'rgba(255,255,255,0.08)'}`,
					borderRadius: 10,
					padding: '11px 14px',
					fontSize: 14,
					color: '#ededed',
					outline: 'none',
					fontFamily: 'inherit',
					transition: 'border-color 0.15s',
					minWidth: 0,
				}}
			/>
			<button
				onClick={onSubmit}
				disabled={loading}
				style={{
					background: loading ? 'rgba(237,237,237,0.6)' : '#ededed',
					color: '#0a0a0a',
					border: 'none',
					borderRadius: 10,
					padding: '11px 20px',
					fontSize: 14,
					fontWeight: 500,
					cursor: loading ? 'default' : 'pointer',
					transition: 'all 0.15s',
					whiteSpace: 'nowrap',
					minWidth: 110,
					fontFamily: 'inherit',
				}}
			>
				{loading ? <LoadingDots /> : 'Сократить'}
			</button>
		</div>
	);
}
