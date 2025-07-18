import { api } from '@/src/utils/AxiosInstance';

export type Tournament = {
	id: number;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	gameName: string;
	gameId: number;
	organizerId: number;
	organizerNickname: string;
	postalCode: string;
	city: string;
	street: string;
	buildingNumber: number;
	latitude: number;
	longitude: number;
	maxTeams: number;
	currentTeams: number;
	status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELED';
	participatingTeams: Array<{
		id: number;
		name: string;
	}>;
	lanTournament: boolean;
};

export type TournamentApplication = {
	id: number;
	teamId: number;
	teamName: string;
	tournamentId: number;
	tournamentName: string;
	applicationDate: string;
	status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
};

export type TournamentSearchParams = {
	name?: string;
	location?: string;
	startDate?: string;
	endDate?: string;
	gameName?: string;
	status?: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
};

export const getTournaments = async (params: TournamentSearchParams): Promise<Tournament[]> => {
	const { data } = await api.get<Tournament[]>('/tournaments/search', { params });

	return data;
};

export const getTournamentById = async (id: number): Promise<Tournament> => {
	const { data } = await api.get<Tournament>(`/tournaments/${id}`);

	return data;
};

export const createTournament = async (tournament: Tournament): Promise<Tournament> => {
	const { data } = await api.post<Tournament>('/tournaments', tournament);

	return data;
};

export const updateTournament = async (id: number, tournament: Tournament): Promise<Tournament> => {
	const { data } = await api.put<Tournament>(`/tournaments/${id}`, tournament);

	return data;
};

export const deleteTournament = async (id: number): Promise<void> =>
	await api.delete(`/tournaments/${id}`);

export const getTournamentApplications = async (id: number): Promise<TournamentApplication[]> => {
	const { data } = await api.get<TournamentApplication[]>(`/tournaments/${id}/applications`);

	return data;
};

export const manageTournamentApplication = async (
	tournamentId: number,
	applicationId: number,
	accepted: boolean
): Promise<TournamentApplication> => {
	const { data } = await api.put<TournamentApplication>(
		`/tournaments/${tournamentId}/applications/${applicationId}/status`,
		{
			applicationId: applicationId,
			accepted: accepted,
		}
	);

	return data;
};

export const withdrawFromTournament = async (
	tournamentId: number,
	applicationId: number
): Promise<TournamentApplication> => {
	const { data } = await api.patch<TournamentApplication>(
		`/tournaments/${tournamentId}/applications/${applicationId}/withdraw`
	);

	return data;
};

export const deleteTeamFromTournament = async (
	tournamentId: number,
	teamId: number
): Promise<Tournament> => {
	const { data } = await api.delete<Tournament>(
		`/tournaments/${tournamentId}/teams/${teamId}/remove`
	);

	return data;
};

export const changeTournamentStatus = async (
	tournamentId: number,
	status: Tournament['status']
): Promise<Tournament> => {
	const { data } = await api.patch<Tournament>(`/tournaments/${tournamentId}/status`, null, {
		params: {
			status,
		},
	});

	return data;
};
