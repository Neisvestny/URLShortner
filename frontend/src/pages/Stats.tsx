import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/storeHooks";
import { selectIsAuthenticated, selectUser } from "../features/auth/selectors";

import Navbar from "../layouts/NavBar";

export default function StatsPage() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				background: "#0a0a0a",
				color: "#ededed",
				fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
			}}
		>
			<Navbar
				isAuthenticated={isAuthenticated}
				user={user}
			/>

			<main
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "80px 24px 60px",
					textAlign: "center",
				}}
			></main>
		</div>
	);
}
