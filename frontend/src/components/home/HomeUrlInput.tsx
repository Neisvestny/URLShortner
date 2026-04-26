import LoadingDots from './HomeLoadingDots';

type Props = {
	value: string;
	error: boolean;
	loading: boolean;
	onChange: (v: string) => void;
	onSubmit: () => void;
};

export default function UrlInput({ value, error, loading, onChange, onSubmit }: Props) {
	return (
		<div className={`flex gap-2 ${error ? 'mb-0' : 'mb-0'}`}>
			<input
				type="url"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && !loading && onSubmit()}
				placeholder="https://очень-длинная-ссылка.com/которую/нужно/сократить"
				spellCheck={false}
				autoComplete="off"
				className={`flex-1 min-w-0 bg-surface border rounded-lg px-3.5 py-2.5 text-sm text-fg outline-none transition-colors font-sans placeholder:text-muted ${
					error ? 'border-danger' : 'border-border focus:border-border-hover'
				}`}
			/>
			<button
				onClick={onSubmit}
				disabled={loading}
				className="bg-fg text-bg border-none rounded-lg px-5 py-2.5 text-sm font-medium font-sans cursor-pointer transition-opacity whitespace-nowrap min-w-[110px] disabled:opacity-60 disabled:cursor-default hover:opacity-90"
			>
				{loading ? <LoadingDots /> : 'Сократить'}
			</button>
		</div>
	);
}
