import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { deleteAccount, login, register } from '@/src/api/auth';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';

export const useLoginMutation = () => {
	const navigate = useNavigate();
	const loginSuccess = useAuthStore((state) => state.loginSuccess);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			loginSuccess(data);
			queryClient.clear();
			navigate(RoutePaths.Home);
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Login Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useRegisterMutation = () => {
	const navigate = useNavigate();
	const loginSuccess = useAuthStore((state) => state.loginSuccess);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			loginSuccess(data);
			queryClient.clear();
			navigate(RoutePaths.Home);
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Register Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useDeleteAccountMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			queryClient.clear();
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Delete Account Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	const logoutFromStore = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const logout = () => {
		logoutFromStore();
		queryClient.clear();
		navigate(RoutePaths.Login);
	};

	return logout;
};
