import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { applyTeamToTournament } from '@/src/api/team';
import type { Tournament, TournamentSearchParams } from '@/src/api/tournament';
import {
	createTournament,
	deleteTeamFromTournament,
	getTournamentApplications,
	getTournamentById,
	getTournaments,
	manageTournamentApplication,
	updateTournament,
	withdrawFromTournament,
} from '@/src/api/tournament';
import { RoutePaths } from '@/src/models/enums/RoutePaths';

type ApplyToTournamentPayload = {
	teamId: number;
	tournamentId: number;
};

type ManageApplicationPayload = {
	tournamentId: number;
	applicationId: number;
	accepted: boolean;
};

type DeleteTeamFromTournamentPayload = {
	tournamentId: number;
	teamId: number;
};

type WithdrawFromTournamentPayload = {
	tournamentId: number;
	applicationId: number;
};

export const useGetTournamentsQuery = (params: TournamentSearchParams) => {
	return useQuery({
		queryKey: ['tournaments', 'search', params],
		queryFn: () => getTournaments(params),
	});
};

export const useGetTournamentByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ['tournament', id],
		queryFn: () => getTournamentById(Number(id)),
	});
};

export const useApplyToTournamentMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ teamId, tournamentId }: ApplyToTournamentPayload) =>
			applyTeamToTournament(teamId, tournamentId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament', variables.tournamentId.toString()],
			});
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Join Tournament Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useGetTournamentApplicationsQuery = (id: string, isOrganizer: boolean) => {
	return useQuery({
		queryKey: ['tournament-applications', id],
		queryFn: () => getTournamentApplications(Number(id)),
		enabled: !!isOrganizer,
	});
};

export const useEditTournamentMutation = (id: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Tournament) => updateTournament(Number(id), data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
			queryClient.invalidateQueries({ queryKey: ['tournament', id] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Edit Tournament Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useManageApplicationMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ tournamentId, applicationId, accepted }: ManageApplicationPayload) =>
			manageTournamentApplication(tournamentId, applicationId, accepted),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament-applications', variables.tournamentId.toString()],
			});
			queryClient.invalidateQueries({
				queryKey: ['tournament', variables.tournamentId.toString()],
			});
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Application Manage Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
		},
	});
};

export const useRemoveTeamFromTournamentMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ tournamentId, teamId }: DeleteTeamFromTournamentPayload) =>
			deleteTeamFromTournament(tournamentId, teamId),
		onSuccess: (updatedTournament) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament', updatedTournament.id.toString()],
			});
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Team Remove Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
		},
	});
};

export const useWithdrawFromTournamentMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ tournamentId, applicationId }: WithdrawFromTournamentPayload) =>
			withdrawFromTournament(tournamentId, applicationId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament', variables.tournamentId.toString()],
			});
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Team Withdraw Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
		},
	});
};

export const useCreateTournamentMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createTournament,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
			navigate(RoutePaths.TournamentDetails.replace(':id', data.id.toString()));
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Create Tournament Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
		},
	});
};
