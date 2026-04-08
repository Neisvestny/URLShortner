import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import StatsPage from "./Stats";

export default function RedirectHandler() {
	const { code } = useParams();

	const isValid = code && /^[a-zA-Z0-9]{6}\+?$/.test(code);
	const isStats = code?.endsWith("+");

	useEffect(() => {
		if (!code || !isValid || isStats) return;

		window.location.replace(`https://your-api.com/r/${code}`);
	}, [code, isValid, isStats]);


	if (!code || !isValid) {
		return <Navigate to="/" replace />;
	}

	if (isStats) {
		const cleanCode = code.slice(0, -1);
		console.log(cleanCode);
		return <StatsPage />;
	}

	return <div>Redirecting...</div>;
}