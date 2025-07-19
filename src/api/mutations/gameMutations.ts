import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addGame, deleteGame, getGames, updateGame } from '@/src/api/game';

export const useGetGamesQuery = (name: string = '') => {
	return useQuery({
		queryKey: ['games', name],
		queryFn: () => getGames(name),
	});
};

export const useAddGameMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (gameName: string) => addGame(gameName),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['games'] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Create Game Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useUpdateGameMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ gameId, gameName }: { gameId: number; gameName: string }) =>
			updateGame(gameId, gameName),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['games'] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Update Game Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};

export const useDeleteGameMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (gameId: number) => deleteGame(gameId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['games'] });
		},
		onError: (error: any) => {
			notifications.show({
				title: 'Delete Game Error',
				position: 'top-center',
				color: 'red',
				message: error.response.data.message,
				autoClose: 5000,
			});
		},
	});
};
