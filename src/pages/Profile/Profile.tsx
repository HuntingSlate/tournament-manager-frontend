import type { FC } from 'react';

import { Group, Title, Button, Flex, Loader } from '@mantine/core';
import { useNavigate } from 'react-router';

import { useGetUserProfileQuery } from '@/src/api/mutations/userMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { ProfileGamesStatistics } from '@/src/components/ProfileDetailsComponents/ProfileGamesStatistics';
import { ProfileInformation } from '@/src/components/ProfileDetailsComponents/ProfileInformation';
import { ProfileLinks } from '@/src/components/ProfileDetailsComponents/ProfileLinks';
import { ProfileTeams } from '@/src/components/ProfileDetailsComponents/ProfileTeams';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';

export const Profile: FC = () => {
	const { data, isLoading } = useGetUserProfileQuery();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<PageLayout>
				<Flex justify='center' align='center' h='100%'>
					<Loader color='blue' />
				</Flex>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			<Group pb={16} w='100%' justify='space-between'>
				<Title order={2}>Profile Details</Title>
				{isAuthenticated && (
					<Button
						variant='light'
						color='blue'
						onClick={() => {
							navigate(RoutePaths.ProfileEdit);
						}}
					>
						Edit Profile
					</Button>
				)}
			</Group>
			<ProfileInformation email={data?.email} fullName={data?.fullName} nickname={data?.nickname} />
			<ProfileLinks links={data?.links} />
			<ProfileTeams teams={data?.teams} />
			<ProfileGamesStatistics />
		</PageLayout>
	);
};
