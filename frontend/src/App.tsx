import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import StatsPage from "./pages/Stats";
import RedirectHandler from "./pages/RedirectHandler";
import { useAppSelector } from "./hooks/storeHooks";
import { selectIsInitialized } from "./features/auth/selectors";

function App() {
	useAppSelector(selectIsInitialized);

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/stats" element={<StatsPage />} />
			<Route path="/:code" element={<RedirectHandler />} />
		</Routes>
	);
}

export default App;
