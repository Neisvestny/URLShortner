import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { initAuth } from './features/auth/authSlice';
import { selectIsInitialized } from './features/auth/selectors';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/Home';
import StatsPage from './pages/LinksPage';
import NotFoundPage from './pages/NotFoundPage';
import RedirectHandler from './pages/RedirectHandler';

function App() {
	const dispatch = useAppDispatch();
	const isInitialized = useAppSelector(selectIsInitialized);

	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);

	if (!isInitialized) {
		return null; // или <Spinner />
	}

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/stats" element={<StatsPage />} />
			<Route path="/login" element={<AuthPage />} />
			<Route path="/:code" element={<RedirectHandler />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
