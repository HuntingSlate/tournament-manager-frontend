import axios from 'axios';

import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
			window.location.href = RoutePaths.Login;
		}
		return Promise.reject(error);
	}
);
