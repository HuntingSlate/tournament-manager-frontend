import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { TeamLink, UpdateTeamPayload } from '@/src/api/team';
import {
	addMemberToTeam,
	createTeam,
	createTeamLink,
	deleteTeam,
	deleteTeamLink,
	getTeamById,
	getTeamLinks,
	getTeamTournamentApplications,
	removeMemberFromTeam,
	searchTeamsByNameOrPlayerName,
	updateTeam,
	updateTeamLink,
} from '@/src/api/team';

type UpdateTeamVariables = {
	teamId: number;
	payload: UpdateTeamPayload;
};

type RemoveMemberPayload = {
	teamId: number;
	userId: number;
};

type CreateLinkPayload = {
	teamId: number;
	link: Omit<TeamLink, 'id'>;
};

type UpdateLinkPayload = {
	teamId: number;
	linkId: number;
	link: Omit<TeamLink, 'id'>;
};

type DeleteLinkPayload = {
	teamId: number;
	linkId: number;
};

type AddMemberPayload = {
	teamId: number;
	userId: number;
};

export const useGetTeamTournamentApplicationsQuery = (teamId: string, isOrganizer: boolean) => {
	return useQuery({
		queryKey: ['team-tournament-applications', teamId],
		queryFn: () => getTeamTournamentApplications(Number(teamId)),
		enabled: !!isOrganizer,
	});
};

export const useGetTeamDetailsQuery = (id: string) => {
	return useQuery({
		queryKey: ['teamDetails', id],
		queryFn: () => getTeamById(Number(id)),
	});
};

export const useGetTeamLinksQuery = (teamId: number) => {
	return useQuery({
		queryKey: ['teamLinks', teamId.toString()],
		queryFn: () => getTeamLinks(teamId),
		enabled: !!teamId,
	});
};

export const useCreateTeamMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ teamName, gameId }: { teamName: string; gameId: number }) =>
			createTeam(teamName, gameId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Create Team Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useDeleteTeamLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, linkId }: DeleteLinkPayload) => deleteTeamLink(teamId, linkId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Delete Team Link Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useUpdateTeamLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, linkId, link }: UpdateLinkPayload) =>
			updateTeamLink(teamId, linkId, link),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Update Team Link Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useCreateTeamLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, link }: CreateLinkPayload) => createTeamLink(teamId, link),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Create Team Link Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useDeleteTeamMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (teamId: number) => deleteTeam(teamId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Delete Team Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useRemoveMemberFromTeamMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, userId }: RemoveMemberPayload) => removeMemberFromTeam(teamId, userId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Remove Member From Team Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useAddMemberToTeamMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, userId }: AddMemberPayload) => addMemberToTeam(teamId, userId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Add Member To Team Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useEditTeamMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, payload }: UpdateTeamVariables) => updateTeam(teamId, payload),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Edit Team Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useSearchTeamsQuery = (filters: { name: string; playerName: string }) => {
	return useQuery({
		queryKey: ['teams', 'search', filters],
		queryFn: () => searchTeamsByNameOrPlayerName(filters.name, filters.playerName),
	});
};
