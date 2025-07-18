import { api } from '@/src/utils/AxiosInstance';

export type MatchStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type MatchStatistics = {
	id: number;
	playerId: number;
	playerNickname: string;
	kills: number;
	deaths: number;
	assists: number;
};

export type PlayerMatchStatistics = {
	playerId: number;
	kills: number;
	deaths: number;
	assists: number;
};

export type Match = {
	id: number;
	tournamentId: number;
	tournamentName: string;
	firstTeamId: number;
	firstTeamName: string;
	secondTeamId: number;
	secondTeamName: string;
	startDatetime: Date;
	endDatetime: Date;
	winningTeamId: number;
	winningTeamName: string;
	bracketLevel: number;
	matchNumberInRound: number;
	firstTeamScore: number;
	secondTeamScore: number;
	status: MatchStatus;
	firstTeamMatchStatistics: Array<MatchStatistics>;
	secondTeamMatchStatistics: Array<MatchStatistics>;
};

export type MatchSearchParams = {
	tournamentName?: string;
	gameName?: string;
	teamName?: string;
	playerName?: string;
};

export type MatchRecordResultsParams = {
	scoreTeam1: number;
	scoreTeam2: number;
};

export const getMatchById = async (id: number): Promise<Match> => {
	const { data } = await api.get<Match>(`/matches/${id}`);
	return data;
};

export const updateMatch = async (id: number, match: Match): Promise<Match> => {
	const { data } = await api.put<Match>(`/matches/${id}`, match);
	return data;
};

export const deleteMatch = async (id: number): Promise<void> => await api.delete(`/matches/${id}`);

export const createMatch = async (match: Match): Promise<Match> => {
	const { data } = await api.post<Match>('/matches', match);
	return data;
};

export const createMatchPlayerStatistics = async (
	id: number,
	statistics: PlayerMatchStatistics
): Promise<Match> => {
	const { data } = await api.post<Match>(`/matches/${id}/statistics`, statistics);
	return data;
};

export const recordMatchResult = async (
	id: number,
	params: MatchRecordResultsParams
): Promise<Match> => {
	const { data } = await api.patch(`/matches/${id}/results`, null, { params });
	return data;
};

export const getTournamentMatches = async (tournamentId: number): Promise<Match[]> => {
	const { data } = await api.get<Match[]>(`/tournaments/${tournamentId}/matches`);
	return data;
};

export const getMatches = async (params: MatchSearchParams): Promise<Match[]> => {
	const { data } = await api.get<Match[]>('/matches/search', { params });
	return data;
};
