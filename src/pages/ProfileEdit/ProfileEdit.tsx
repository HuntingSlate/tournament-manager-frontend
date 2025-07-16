import type { FC } from 'react';

import { ActionIcon, Button, Group, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { useDeleteAccountMutation } from '@/src/api/mutations/authMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { ProfileInformation } from '@/src/pages/ProfileEdit/components/ProfileInformation';
import { ProfileLinks } from '@/src/pages/ProfileEdit/components/ProfileLinks';
import { ProfilePassword } from '@/src/pages/ProfileEdit/components/ProfilePassword';
import { useAuthStore } from '@/src/store/authStore';

export const ProfileEdit: FC = () => {
	const navigate = useNavigate();
	const { mutate, isPending } = useDeleteAccountMutation();
	const logout = useAuthStore((state) => state.logout);

	const handleDeleteAccount = () => {
		mutate(undefined, {
			onSuccess: () => {
				logout();
				navigate(RoutePaths.Home);
			},
		});
	};

	return (
		<PageLayout>
			<Group pb={16} w='100%' justify='space-between'>
				<Group gap={8}>
					<ActionIcon
						color='blue'
						variant='transparent'
						onClick={() => navigate(RoutePaths.Profile)}
					>
						<IconChevronLeft size={24} />
					</ActionIcon>
					<Title order={2}>Edit Profile</Title>
				</Group>
				<Button variant='light' color='red' onClick={handleDeleteAccount} loading={isPending}>
					Delete Account
				</Button>
			</Group>
			<ProfileInformation />
			<ProfilePassword />
			<ProfileLinks />
		</PageLayout>
	);
};
