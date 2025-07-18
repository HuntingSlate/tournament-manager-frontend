import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
	Match,
	MatchRecordResultsParams,
	MatchSearchParams,
	PlayerMatchStatistics,
} from '@/src/api/match';
import {
	createMatch,
	createMatchPlayerStatistics,
	deleteMatch,
	getMatches,
	getTournamentMatches,
	recordMatchResult,
	updateMatch,
} from '@/src/api/match';

export const useGetTournamentMatchesQuery = (tournamentId: number) => {
	return useQuery({
		queryKey: ['tournament-matches', tournamentId],
		queryFn: () => getTournamentMatches(tournamentId),
		enabled: !!tournamentId,
	});
};

export const useGetMatchesQuery = (params: MatchSearchParams) => {
	return useQuery({
		queryKey: ['matches', 'search', params],
		queryFn: () => getMatches(params),
	});
};

export const useCreateMatchMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (match: Match) => createMatch(match),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament-matches', data.tournamentId],
			});
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Match Creation Error',
				message: error.response?.data?.message,
				color: 'red',
				autoClose: 5000,
			});
		},
	});
};

export const useRecordMatchResultMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, params }: { id: number; params: MatchRecordResultsParams }) =>
			recordMatchResult(id, params),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament-matches', data.tournamentId],
			});
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Record Match Result Error',
				message: error.response?.data?.message,
				color: 'red',
				autoClose: 5000,
			});
		},
	});
};

export const useUpdateMatchMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, match }: { id: number; match: Match }) => updateMatch(id, match),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament-matches', data.tournamentId],
			});
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Match Update Error',
				message: error.response?.data?.message,
				color: 'red',
				autoClose: 5000,
			});
		},
	});
};

export const useDeleteMatchMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id }: { id: number; tournamentId: number }) => deleteMatch(id),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament-matches', variables.tournamentId],
			});
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Match Deletion Error',
				message: error.response?.data?.message,
				color: 'red',
				autoClose: 5000,
			});
		},
	});
};

export const useCreateMatchPlayerStatisticsMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			statistics,
		}: {
			id: number;
			statistics: PlayerMatchStatistics;
			tournamentId: number;
		}) => createMatchPlayerStatistics(id, statistics),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['tournament-matches', variables.tournamentId],
			});
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Player Statistics Creation Error',
				message: error.response?.data?.message,
				color: 'red',
				autoClose: 5000,
			});
		},
	});
};
