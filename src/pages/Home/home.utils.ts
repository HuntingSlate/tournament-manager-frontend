import { useQuery } from '@tanstack/react-query';

import type { TournamentSearchParams } from '@/src/api/tournament';
import { getTournaments } from '@/src/api/tournament';

export const useTournamentsQuery = (params: TournamentSearchParams) => {
	return useQuery({
		queryKey: ['tournaments', params],
		queryFn: () => getTournaments(params),
	});
};
