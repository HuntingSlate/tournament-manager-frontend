import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';

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
