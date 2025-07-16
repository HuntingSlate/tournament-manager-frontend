import { api } from '@/src/utils/AxiosInstance';

export type Game = {
	id: number;
	name: string;
	imageUrl?: string;
};

export const getGames = async (): Promise<Game[]> => {
	const { data } = await api.get<Game[]>('/games');
	return data;
};

export const getGameById = async (gameId: number): Promise<Game> => {
	const { data } = await api.get<Game>(`/games/${gameId}`);
	return data;
};

export const addGame = async (gameName: string): Promise<Game> => {
	const { data } = await api.post<Game>('/games', { name: gameName });
	return data;
};

export const deleteGame = async (gameId: number): Promise<void> =>
	await api.delete(`/games/${gameId}`);

export const updateGame = async (gameId: number, gameName: string): Promise<Game> => {
	const { data } = await api.put<Game>(`/games/${gameId}`, { name: gameName });
	return data;
};
