import { useQuery } from '@tanstack/react-query';

import {
	getLoggedInPlayerFromGameStatistics,
	getPlayerLeaderboardFromGame,
	getPlayerStatisticsFromGame,
	getPlayerStatisticsFromMatch,
} from '@/src/api/statistics';

export const useGetPlayerRankingByGameIdQuery = (gameId: number | null) => {
	return useQuery({
		queryKey: ['player-ranking', gameId],
		queryFn: () => getPlayerLeaderboardFromGame(gameId!),
		enabled: typeof gameId === 'number',
	});
};

export const useGetLoggedPlayerStatisticsFromGameQuery = (gameId: number) => {
	return useQuery({
		queryKey: ['player-statistics', gameId],
		queryFn: () => getLoggedInPlayerFromGameStatistics(gameId),
		enabled: !!gameId,
	});
};

export const useGetPlayerStatisticsFromGameQuery = (playerId: number, gameId: number) => {
	return useQuery({
		queryKey: ['player-statistics', playerId, gameId],
		queryFn: () => getPlayerStatisticsFromGame(gameId, playerId),
		enabled: !!gameId && !!playerId,
	});
};

export const useGetPlayerMatchStatisticsQuery = (matchId: number, playerId: number) => {
	return useQuery({
		queryKey: ['player-match-statistics', matchId, playerId],
		queryFn: () => getPlayerStatisticsFromMatch(matchId, playerId),
	});
};
