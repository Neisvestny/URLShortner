import Navbar from "./NavBar";
import { useAppSelector } from "../hooks/storeHooks";
import { selectIsAuthenticated, selectUser } from "../features/auth/selectors";

type Props = {
	children: React.ReactNode;
};
export default function MainLayout({ children }: Props) {
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
			<Navbar isAuthenticated={isAuthenticated} user={user} />

			<main
				style={{
					flex: 1,
					display: "flex",
					justifyContent: "center", // ✅ только по горизонтали
					padding: "80px 24px 60px",
				}}
			>
				<div
					style={{
						width: "100%",
						maxWidth: 1200, // 👈 вот это ключ
					}}
				>
					{children}
				</div>
			</main>
		</div>
	);
}
