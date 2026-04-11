export default function getPasswordStrength(password: string) {
	let score = 0;

	if (password.length >= 8) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[a-z]/.test(password)) score++;
	if (/\d/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	if (score <= 2) return { label: 'Слабый', color: '#ff4d4f' };
	if (score === 3 || score === 4)
		return { label: 'Средний', color: '#faad14' };

	return { label: 'Сильный', color: '#52c41a' };
}
