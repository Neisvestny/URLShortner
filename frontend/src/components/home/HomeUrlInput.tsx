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
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && !loading && onSubmit()}
				placeholder="https://очень-длинная-ссылка.com/которую/нужно/сократить"
				spellCheck={false}
				autoComplete="off"
				style={{
					flex: 1,
					background: 'var(--surface)',
					border: `0.5px solid ${error ? 'var(--color-border-danger, #ff4444)' : 'var(--border)'}`,
					borderRadius: 10,
					padding: '11px 14px',
					fontSize: 14,
					color: 'var(--fg)',
					outline: 'none',
					fontFamily: 'inherit',
					transition: 'border-color 0.15s',
					minWidth: 0,
				}}
				onFocus={(e) => {
					e.currentTarget.style.borderColor = error
						? 'var(--color-border-danger, #ff4444)'
						: 'var(--border-hover)';
				}}
				onBlur={(e) => {
					e.currentTarget.style.borderColor = error
						? 'var(--color-border-danger, #ff4444)'
						: 'var(--border)';
				}}
			/>
			<button
				onClick={onSubmit}
				disabled={loading}
				style={{
					background: loading
						? 'var(--fg-muted, var(--muted))'
						: 'var(--fg)',
					color: 'var(--bg)',
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
					opacity: loading ? 0.6 : 1,
				}}
				onMouseEnter={(e) => {
					if (!loading) e.currentTarget.style.opacity = '0.88';
				}}
				onMouseLeave={(e) => {
					if (!loading) e.currentTarget.style.opacity = '1';
				}}
			>
				{loading ? <LoadingDots /> : 'Сократить'}
			</button>
		</div>
	);
}
