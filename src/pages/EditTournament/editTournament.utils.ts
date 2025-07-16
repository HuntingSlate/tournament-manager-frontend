import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import type { Tournament } from '@/src/api/tournament';
import { updateTournament } from '@/src/api/tournament';
import { RoutePaths } from '@/src/models/enums/RoutePaths';

export const useEditTournamentMutation = (id: string) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: Tournament) => updateTournament(Number(id), data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
			queryClient.invalidateQueries({ queryKey: ['tournament', id] });

			navigate(RoutePaths.TournamentDetails.replace(':id', data.id.toString()));
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
