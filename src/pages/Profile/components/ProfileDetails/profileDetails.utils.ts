import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getProfile, updateProfile } from '@/src/api/user';
import { useAuthStore } from '@/src/store/authStore';

export const useGetProfileDetailsMutation = () => {
	const initialUser = useAuthStore.getState().user;

	return useQuery({
		queryKey: ['user-profile'],
		queryFn: getProfile,
		initialData: initialUser
			? {
					id: initialUser.id,
					email: initialUser.email,
					nickname: initialUser.nickname,
					fullName: initialUser.fullName || '',
					links: [],
				}
			: undefined,
	});
};

export const useUpdateProfileDetailsMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onSuccess: (data) => {
			queryClient.setQueryData(['user-profile'], data);
		},
		onError: (error: any) => {
			console.error(error);
		},
	});
};
