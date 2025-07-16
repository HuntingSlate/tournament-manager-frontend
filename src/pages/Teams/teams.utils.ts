import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteTeam, searchTeamsByNameOrPlayerName } from '@/src/api/team';
import { getUserTeams } from '@/src/api/user';

export const usePlayerTeamsQuery = () => {
	return useQuery({
		queryKey: ['playerTeams'],
		queryFn: getUserTeams,
	});
};

export const useSearchTeamsQuery = (filters: { name: string; playerName: string }) => {
	return useQuery({
		queryKey: ['teams', 'search', filters],
		queryFn: () => searchTeamsByNameOrPlayerName(filters.name, filters.playerName),
	});
};

export const useDeleteTeamMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (teamId: number) => deleteTeam(teamId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] });
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
