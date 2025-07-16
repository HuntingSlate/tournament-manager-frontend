import type { Team } from '@/src/api/team';
import { api } from '@/src/utils/AxiosInstance';

export type ProfileLink = { id: number; url: string; type: string; platformUsername?: string };

export type UserProfile = {
	id: number;
	email: string;
	nickname: string;
	fullName: string;
	links: ProfileLink[];
	teams: Team[];
};

export type UpdateProfileData = { fullName?: string; nickname?: string };
export type ChangePasswordData = { currentPassword: string; newPassword: string };
export type AddProfileLinkData = Omit<ProfileLink, 'id'>;

export const getProfile = async (): Promise<UserProfile> => {
	const { data } = await api.get<UserProfile>('/users/me');
	return data;
};

export const updateProfile = async (updateData: UpdateProfileData): Promise<UserProfile> => {
	const { data } = await api.put<UserProfile>('/users/me/profile', updateData);
	return data;
};

export const changePassword = async (data: ChangePasswordData): Promise<void> =>
	await api.put('/users/me/password', data);

export const getProfileLinks = async (): Promise<ProfileLink[]> => {
	const { data } = await api.get<ProfileLink[]>('/users/me/links');
	return data;
};

export const addProfileLink = async (linkData: AddProfileLinkData): Promise<ProfileLink> => {
	const { data } = await api.post<ProfileLink>('/users/me/links', linkData);
	return data;
};

export const updateProfileLink = async (
	linkId: number,
	linkData: AddProfileLinkData
): Promise<ProfileLink> => {
	const { data } = await api.put<ProfileLink>(`/users/me/links/${linkId}`, linkData);
	return data;
};

export const removeProfileLink = async (linkId: number): Promise<void> =>
	await api.delete(`/users/me/links/${linkId}`);

export const getProfileById = async (userId: number): Promise<UserProfile> => {
	const { data } = await api.get<UserProfile>(`/users/${userId}`);
	return data;
};

export const searchProfileByName = async (name: string): Promise<UserProfile[]> => {
	const { data } = await api.get<UserProfile[]>('/users/search', { params: { nickname: name } });
	return data;
};

export const getUserTeams = async (): Promise<Team[]> => {
	const { data } = await api.get<Team[]>('/users/me/teams');
	return data;
};
