import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { selectIsAuthenticated, selectUser } from "../features/auth/selectors";

import Navbar from "../layouts/NavBar";
import ShortenForm from "../components/home/ShortenForm";
import StatsBar from "../components/home/StatsBar";

import { login } from "../features/auth/authSlice";

export default function HomePage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(login({ username: "Test" }));
	}, [dispatch]);
	
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const user = useAppSelector(selectUser);

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
			>
				{/* Заголовок */}
				<h1
					style={{
						fontSize: "clamp(36px, 6vw, 64px)",
						fontWeight: 500,
						letterSpacing: "-2px",
						lineHeight: 1.05,
						margin: "0 0 16px",
						maxWidth: 700,
					}}
				>
					Короткие ссылки.
					<br />
					<span style={{ color: "#888" }}>Умная аналитика.</span>
				</h1>

				<p
					style={{
						fontSize: 16,
						color: "#888",
						maxWidth: 420,
						lineHeight: 1.6,
						margin: "0 0 48px",
					}}
				>
					Сокращайте ссылки и отслеживайте каждый переход — браузер,
					ОС, регион и время.
				</p>

				<ShortenForm />
				<StatsBar />
			</main>
		</div>
	);
}
