import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { createTournament } from '@/src/api/tournament';

export const useCreateTournamentMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createTournament,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
			navigate(`/tournaments/${data.id}`);
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
