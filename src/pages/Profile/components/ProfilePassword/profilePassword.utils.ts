import { useMutation } from '@tanstack/react-query';

import { changePassword } from '@/src/api/user';

export const useUpdateProfilePasswordMutation = () => {
	return useMutation({
		mutationFn: changePassword,
		onSuccess: () => {},
		onError: (error: any) => {
			console.error(error);
		},
	});
};
