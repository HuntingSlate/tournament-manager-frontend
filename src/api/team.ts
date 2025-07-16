import { api } from '@/src/utils/AxiosInstance';

export type TeamLink = {
	id: number;
	type: string;
	url: string;
	platformUsername: string;
};

export type TeamMember = {
	userId: number;
	userNickname: string;
	startDate: string;
	endDate: string;
};

export type Team = {
	id: number;
	name: string;
	gameId: number;
	gameName: string;
	leaderId: number;
	leaderNickname: string;
	teamMembers: Array<TeamMember>;
	teamLinks: Array<TeamLink>;
	tournaments: Array<{
		tournamentId: number;
		tournamentName: string;
		status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELED';
	}>;
};

export type UpdateTeamPayload = {
	name: string;
	gameId: number;
	teamLinks: Array<TeamLink>;
};

// Teams
export const getTeamById = async (teamId: number): Promise<Team> => {
	const { data } = await api.get<Team>(`/teams/${teamId}`);
	return data;
};

export const searchTeamsByNameOrPlayerName = async (
	name: string,
	playerName: string
): Promise<Team[]> => {
	const { data } = await api.get<Team[]>('/teams/search', { params: { name, playerName } });
	return data;
};

export const createTeam = async (teamName: string, gameId: number): Promise<Team> => {
	const { data } = await api.post<Team>('/teams', { name: teamName, gameId });
	return data;
};

export const updateTeam = async (teamId: number, payload: UpdateTeamPayload): Promise<Team> => {
	const { data } = await api.put<Team>(`/teams/${teamId}`, payload);
	return data;
};

export const deleteTeam = async (teamId: number): Promise<void> =>
	await api.delete(`/teams/${teamId}`);

// Team Members
export const addMemberToTeam = async (teamId: number, userId: number): Promise<Team> => {
	const { data } = await api.post<Team>(`/teams/${teamId}/members/${userId}`);
	return data;
};

export const removeMemberFromTeam = async (teamId: number, userId: number): Promise<void> =>
	await api.delete(`/teams/${teamId}/members/${userId}`);

// Team Links
export const getTeamLinks = async (teamId: number): Promise<TeamLink[]> => {
	const { data } = await api.get<TeamLink[]>(`/teams/${teamId}/links`);
	return data;
};

export const createTeamLink = async (
	teamId: number,
	link: Omit<TeamLink, 'id'>
): Promise<TeamLink> => {
	const { data } = await api.post<TeamLink>(`/teams/${teamId}/links`, link);
	return data;
};

export const updateTeamLink = async (
	teamId: number,
	linkId: number,
	link: Omit<TeamLink, 'id'>
): Promise<TeamLink> => {
	const { data } = await api.put<TeamLink>(`/teams/${teamId}/links/${linkId}`, link);
	return data;
};

export const deleteTeamLink = async (teamId: number, linkId: number): Promise<void> =>
	await api.delete(`/teams/${teamId}/links/${linkId}`);

// Rest
export const applyTeamToTournament = async (
	teamId: number,
	tournamentId: number
): Promise<Team> => {
	const { data } = await api.post<Team>(`/teams/${teamId}/apply/${tournamentId}`);
	return data;
};
