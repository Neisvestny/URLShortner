type UserBadgeProps = {
	username?: string;
};

export default function UserBadge({ username }: UserBadgeProps) {
	const initials = username ? username.slice(0, 2).toUpperCase() : "??";

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 8,
				padding: "4px 10px 4px 4px",
				border: "1px solid rgba(255,255,255,0.08)",
				borderRadius: 100,
				cursor: "default",
			}}
		>
			<div
				style={{
					width: 26,
					height: 26,
					borderRadius: "50%",
					background: "rgba(237,237,237,0.1)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 11,
					fontWeight: 500,
					color: "#ededed",
					letterSpacing: "0.3px",
				}}
			>
				{initials}
			</div>
			<span style={{ fontSize: 13, color: "#ededed" }}>{username}</span>
		</div>
	);
}