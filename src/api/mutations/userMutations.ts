import { notifications } from '@mantine/notifications';
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

export const useGetProfileLinksQuery = () => {
	return useQuery({
		queryKey: ['user-profile'],
		queryFn: getProfileLinks,
	});
};

export const useGetProfileByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ['user-profile', id],
		queryFn: () => getProfileById(Number(id)),
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
		onError: (error: any) => {
			notifications.show({
				title: 'Update Profile Information Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
		},
	});
};

export const useUpdateProfilePasswordMutation = () => {
	return useMutation({
		mutationFn: changePassword,
		onError: (error: any) => {
			notifications.show({
				title: 'Update Password Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
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
			notifications.show({
				title: 'Add Profile Link Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
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
			notifications.show({
				title: 'Update Profile Link Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
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
			notifications.show({
				title: 'Remove Profile Link Error',
				message: error.response?.data?.message,
				color: 'red',
				position: 'top-center',
				autoClose: 5000,
			});
		},
	});
};

export const useProfileSearchQuery = (nickname: string) => {
	return useQuery({
		queryKey: ['player-search', nickname],
		queryFn: () => searchProfileByName(nickname),
	});
};
