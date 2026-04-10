import { useNavigate, Link } from "react-router-dom";
import { useCallback } from "react";
import type { User } from "../types/user";
import LogoIcon from "../components/nav/NavLogoIcon";
import LoginButton from "../components/nav/NavLoginButton";
import NavLink from "../components/nav/NavLink";
import UserBadge from "../components/nav/NavUserBadge";

type NavbarProps = {
	isAuthenticated: boolean;
	user?: User | null;
};

export default function Navbar({ isAuthenticated, user }: NavbarProps) {
	const navigate = useNavigate();

	const handleNavigateStats = useCallback(() => {
		navigate("/stats");
	}, [navigate]);

	return (
		<nav
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "16px 32px",
				borderBottom: "1px solid rgba(255,255,255,0.08)",
				position: "sticky",
				top: 0,
				background: "rgba(10,10,10,0.85)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				zIndex: 10,
			}}
		>
			{/* Логотип */}
			<Link
				to="/"
				style={{
					display: "flex",
					alignItems: "center",
					gap: 8,
					fontSize: 15,
					fontWeight: 500,
					letterSpacing: "-0.3px",
					textDecoration: "none",
					color: "inherit",
				}}
			>
				<LogoIcon />
				URL Shortner
			</Link>

			{/* Ссылки */}
			<div style={{ display: "flex", alignItems: "center", gap: 4 }}>
				{isAuthenticated && (
					<NavLink onClick={handleNavigateStats}>Статистика</NavLink>
				)}

				{isAuthenticated ? (
					<UserBadge username={user?.username} />
				) : (
					<LoginButton />
				)}
			</div>
		</nav>
	);
}
