import { useQuery } from '@tanstack/react-query';

import { getGames } from '@/src/api/game';

export const useGamesQuery = () => {
	return useQuery({
		queryKey: ['games'],
		queryFn: getGames,
	});
};
