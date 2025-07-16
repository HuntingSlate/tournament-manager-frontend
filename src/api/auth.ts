import { api } from '@/src/utils/AxiosInstance';

type LoginData = {
	email: string;
	password: string;
};

type RegisterData = {
	email: string;
	nickname: string;
	password: string;
};

export type AuthResponse = {
	token: string;
	userId: number;
	email: string;
	nickname: string;
	fullName?: string;
	role: 'ROLE_USER' | 'ROLE_ADMIN';
};

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
	const { data } = await api.post<AuthResponse>('/auth/login', loginData);

	return data;
};

export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
	const { data } = await api.post<AuthResponse>('/auth/register', registerData);

	return data;
};

export const deleteAccount = async (): Promise<void> => await api.delete('/auth/me');
