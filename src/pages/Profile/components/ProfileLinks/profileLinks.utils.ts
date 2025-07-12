import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { AddProfileLinkData } from '@/src/api/user';
import {
	addProfileLink,
	getProfileLinks,
	removeProfileLink,
	updateProfileLink,
} from '@/src/api/user';

export const useProfileLinksQuery = () => {
	return useQuery({
		queryKey: ['user-profile-links'],
		queryFn: getProfileLinks,
	});
};

export const useAddProfileLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addProfileLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-profile-links'] });
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
			queryClient.invalidateQueries({ queryKey: ['user-profile-links'] });
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
			queryClient.invalidateQueries({ queryKey: ['user-profile-links'] });
		},
		onError: (error: any) => {
			console.error(error);
		},
	});
};
