import { useQuery } from '@tanstack/react-query';

import { getTournamentById } from '@/src/api/tournament';

export const useTournamentDetailsQuery = (id: string) => {
	return useQuery({
		queryKey: ['tournamentDetails', id],
		queryFn: () => getTournamentById(Number(id)),
	});
};
