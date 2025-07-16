import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
	createTeamLink,
	deleteTeam,
	deleteTeamLink,
	getTeamLinks,
	removeMemberFromTeam,
	updateTeam,
	updateTeamLink,
} from '@/src/api/team';
import type { UpdateTeamPayload, TeamLink } from '@/src/api/team';

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

export const useEditTeamMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, payload }: UpdateTeamVariables) => updateTeam(teamId, payload),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error) => {
			console.error(error);
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
		onError: (error) => {
			console.error(error);
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
		onError: (error) => {
			console.error(error);
		},
	});
};

export const useCreateLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ teamId, link }: CreateLinkPayload) => createTeamLink(teamId, link),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['teamDetails', variables.teamId.toString()] });
		},
		onError: (error) => {
			console.error(error);
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
		onError: (error) => {
			console.error(error);
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
		onError: (error) => {
			console.error(error);
		},
	});
};

export const useGetTeamLinksQuery = (teamId: number) => {
	return useQuery({
		queryKey: ['teamLinks', teamId.toString()],
		queryFn: () => getTeamLinks(teamId),
		enabled: !!teamId,
	});
};
