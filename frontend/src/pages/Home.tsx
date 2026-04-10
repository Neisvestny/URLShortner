import MainLayout from "../layouts/MainLayout";

import ShortenForm from "../components/home/HomeShortenForm";
import StatsBar from "../components/home/HomeStatsBar";

import { useEffect } from "react";
import { useAppDispatch } from "../hooks/storeHooks";
import { login } from "../features/auth/authSlice";

export default function HomePage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(login({ username: "Test" }));
	}, [dispatch]);

	return (
		<MainLayout>
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
				Сокращайте ссылки и отслеживайте каждый переход — браузер, ОС,
				регион и время.
			</p>

			<ShortenForm />
			<StatsBar />
		</MainLayout>
	);
}
