import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addGame, deleteGame, updateGame } from '@/src/api/game';

export const useAddGameMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (gameName: string) => addGame(gameName),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['games'] });
		},
		onError: (error) => {
			console.error(error);
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
		onError: (error) => {
			console.error(error);
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
		onError: (error) => {
			console.error(error);
		},
	});
};
