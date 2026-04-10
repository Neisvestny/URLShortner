import { useState } from "react";
import type { Result } from "../types/result";

export function useShortener() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<Result | null>(null);

	async function shorten(url: string) {
		// TODO: url передавать в бд
		setLoading(true);
		setError("");
		setResult(null);

		try {
			await new Promise((r) => setTimeout(r, 900));

			const mockCode = Math.random().toString(36).slice(2, 8);
			const base = `snip.ly/${mockCode}`;

			setResult({
				shortLink: base,
				statsLink: `${base}+`,
			});
		} catch {
			setError("Ошибка сервера. Попробуй ещё раз.");
		} finally {
			setLoading(false);
		}
	}

	return { loading, error, result, shorten, setError };
}
