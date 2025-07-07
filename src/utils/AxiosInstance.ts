import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
	// ADD AUTH LOGIC
});
