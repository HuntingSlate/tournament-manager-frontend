import type { FC } from 'react';

import { Title, Flex, Loader, Group, Button } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';

import { useGetProfileByIdQuery } from '@/src/api/mutations/userMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { ProfileDetailsGamesStatistics } from '@/src/components/ProfileDetailsComponents/ProfileDetailsGamesStatistics';
import { ProfileInformation } from '@/src/components/ProfileDetailsComponents/ProfileInformation';
import { ProfileLinks } from '@/src/components/ProfileDetailsComponents/ProfileLinks';
import { ProfileTeams } from '@/src/components/ProfileDetailsComponents/ProfileTeams';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';

export const ProfileDetails: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useGetProfileByIdQuery(id!);
	const isCurrentUser = Number(id) === useAuthStore((state) => state.user?.id);

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
			<Group justify='space-between' pb={16}>
				<Title order={2}>Profile Details</Title>
				{isCurrentUser && (
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
			<ProfileDetailsGamesStatistics />
		</PageLayout>
	);
};
