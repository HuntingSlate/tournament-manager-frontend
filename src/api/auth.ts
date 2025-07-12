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

type LoginResponse = {
	token: string;
	user: {
		id: number;
		email: string;
		nickname: string;
		fullName?: string;
	};
};

type RegisterResponse = {
	token: string;
	user: {
		id: number;
		email: string;
		nickname: string;
		fullName?: string;
	};
};

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
	const { data } = await api.post<LoginResponse>('/auth/login', loginData);

	return data;
};

export const register = async (registerData: RegisterData): Promise<RegisterResponse> => {
	const { data } = await api.post<RegisterResponse>('/auth/register', registerData);

	return data;
};
