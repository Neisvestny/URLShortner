export default function LoadingDots() {
	return (
		<span className="inline-flex gap-1 items-center h-4">
			{[0, 0.15, 0.3].map((delay, i) => (
				<span
					key={i}
					className="size-1 bg-current rounded-full inline-block"
					style={{ animation: `dot-bounce 0.9s ${delay}s infinite` }}
				/>
			))}
		</span>
	);
}
