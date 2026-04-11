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
				color: '#f87171',
				padding: '10px 14px',
				background: 'rgba(248,113,113,0.06)',
				border: '1px solid rgba(248,113,113,0.15)',
				borderRadius: 8,
			}}
		>
			{message}
		</p>
	);
}
