import { api } from '@/src/utils/AxiosInstance';

export type GamePlayerRanking = {
	id: number;
	playerId: number;
	playerNickname: string;
	gameId: number;
	gameName: string;
	totalKills: number;
	totalDeaths: number;
	totalAssists: number;
	averageKills: number;
	averageDeaths: number;
	averageAssists: number;
	matchesPlayed: number;
};

type PlayerMatchStatistics = {
	id: number;
	playerId: number;
	playerNickname: string;
	kills: number;
	deaths: number;
	assists: number;
};

export const getPlayerLeaderboardFromGame = async (
	gameId: number
): Promise<GamePlayerRanking[]> => {
	const { data } = await api.get(`/statistics/ranking/game/${gameId}`);
	return data;
};

export const getPlayerStatisticsFromGame = async (
	playerId: number,
	gameId: number
): Promise<GamePlayerRanking> => {
	const { data } = await api.get(`/statistics/player/${playerId}/game/${gameId}`);
	return data;
};

export const getLoggedInPlayerFromGameStatistics = async (
	gameId: number
): Promise<GamePlayerRanking[]> => {
	const { data } = await api.get(`/statistics/player/${gameId}`);
	return data;
};

export const getPlayerStatisticsFromMatch = async (
	matchId: number,
	playerId: number
): Promise<PlayerMatchStatistics> => {
	const { data } = await api.get(`/statistics/match/${matchId}/player/${playerId}`);
	return data;
};
