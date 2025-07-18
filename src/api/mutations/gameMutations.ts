import { useQuery } from '@tanstack/react-query';

import { getGames } from '@/src/api/game';

export const useGetGamesQuery = (name: string = '') => {
	return useQuery({
		queryKey: ['games', name],
		queryFn: () => getGames(name),
	});
};
