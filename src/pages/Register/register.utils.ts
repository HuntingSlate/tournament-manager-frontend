import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { register } from '@/src/api/auth';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';

export const useRegisterMutation = () => {
	const navigate = useNavigate();
	const loginSuccess = useAuthStore((state) => state.loginSuccess);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			loginSuccess(data.token, data.user);
			queryClient.clear();
			navigate(RoutePaths.Home);
		},
		onError: (error: any) => {
			console.error(error);
		},
	});
};
