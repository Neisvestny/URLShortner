import type { User } from '../types/user';
import { api } from './axios';

export const authApi = {
	register: (data: { username: string; email: string; password: string }) =>
		api.post('/auth/register', data),

	login: (data: { email: string; password: string }) =>
		api.post<{ user: User }>('/auth/login', data),

	logout: () => api.post('/auth/logout'),

	me: () => api.get<{ user: User }>('/auth/me'),
};
