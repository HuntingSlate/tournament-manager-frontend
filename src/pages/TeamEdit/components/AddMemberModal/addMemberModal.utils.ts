import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addMemberToTeam } from '@/src/api/team';
import { searchProfileByName } from '@/src/api/user';

type AddMemberPayload = {
	teamId: number;
	userId: number;
};

export const useGetUsersQuery = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: () => searchProfileByName(''),
	});
};

export const useAddMemberToTeamMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, userId }: AddMemberPayload) => addMemberToTeam(teamId, userId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
