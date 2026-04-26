type Props = { message: string };

export default function AuthError({ message }: Props) {
	return (
		<p className="mt-3.5 mb-0 text-sm text-danger px-3.5 py-2.5 bg-danger-bg border border-danger-border rounded-btn">
			{message}
		</p>
	);
}
