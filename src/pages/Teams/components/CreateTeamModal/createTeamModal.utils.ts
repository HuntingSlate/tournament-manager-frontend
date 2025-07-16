import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTeam } from '@/src/api/team';

export const useCreateTeamMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ teamName, gameId }: { teamName: string; gameId: number }) =>
			createTeam(teamName, gameId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] });
		},
		onError: (error: any) => {
			console.error(error);
		},
	});
};
