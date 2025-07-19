import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { AddProfileLinkData } from '@/src/api/user';
import {
	addProfileLink,
	changePassword,
	getProfile,
	getProfileById,
	getProfileLinks,
	getUserTeams,
	removeProfileLink,
	searchProfileByName,
	updateProfile,
	updateProfileLink,
} from '@/src/api/user';

export const useGetUserProfileQuery = () => {
	return useQuery({
		queryKey: ['user-profile'],
		queryFn: () => getProfile(),
	});
};

export const useGetProfileByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ['user-profile', id],
		queryFn: () => getProfileById(Number(id)),
	});
};

export const useGetProfileLinksQuery = () => {
	return useQuery({
		queryKey: ['user-profile'],
		queryFn: getProfileLinks,
	});
};

export const useGetProfileTeamsQuery = () => {
	return useQuery({
		queryKey: ['user-profile'],
		queryFn: () => getUserTeams(),
	});
};

export const useUpdateProfileInformationMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onSuccess: (data) => {
			queryClient.setQueryData(['user-profile'], data);
		},
		onError: (error) => {
			console.error(error);
		},
	});
};

export const useUpdateProfilePasswordMutation = () => {
	return useMutation({
		mutationFn: changePassword,
		onError: (error) => {
			console.error(error);
		},
	});
};

export const useAddProfileLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addProfileLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-profile'] });
		},
		onError: (error: any) => {
			console.error(error);
		},
	});
};

export const useUpdateProfileLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ linkId, linkData }: { linkId: number; linkData: AddProfileLinkData }) =>
			updateProfileLink(linkId, linkData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-profile'] });
		},
		onError: (error: any) => {
			console.error(error);
		},
	});
};

export const useRemoveProfileLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ linkId }: { linkId: number }) => removeProfileLink(linkId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-profile'] });
		},
		onError: (error: any) => {
			console.error(error);
		},
	});
};

export const useProfileSearchQuery = (nickname: string) => {
	return useQuery({
		queryKey: ['player-search', nickname],
		queryFn: () => searchProfileByName(nickname),
	});
};
