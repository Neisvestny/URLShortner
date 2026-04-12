type Props = {
	message: string;
};

export default function AuthError({ message }: Props) {
	return (
		<p
			style={{
				marginTop: 14,
				marginBottom: 0,
				fontSize: 13,
				color: 'var(--color-text-danger)',
				padding: '10px 14px',
				background: 'var(--color-background-danger)',
				border: '0.5px solid var(--color-border-danger)',
				borderRadius: 8,
			}}
		>
			{message}
		</p>
	);
}
