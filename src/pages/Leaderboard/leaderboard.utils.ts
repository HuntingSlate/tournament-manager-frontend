import { useQuery } from '@tanstack/react-query';

import { getPlayerLeaderboardFromGame } from '@/src/api/statistics';

export const usePlayerRankingQuery = (gameId: number | null) => {
	return useQuery({
		queryKey: ['player-ranking', gameId],
		queryFn: () => getPlayerLeaderboardFromGame(gameId!),
		enabled: typeof gameId === 'number',
	});
};
