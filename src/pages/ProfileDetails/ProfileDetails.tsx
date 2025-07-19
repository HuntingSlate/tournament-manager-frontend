import type { FC } from 'react';

import { Title, Flex, Loader } from '@mantine/core';
import { useParams } from 'react-router';

import { useGetProfileByIdQuery } from '@/src/api/mutations/userMutations';
import { PageLayout } from '@/src/components/layouts/PageLayout';
import { ProfileDetailsGamesStatistics } from '@/src/components/ProfileDetailsComponents/ProfileDetailsGamesStatistics';
import { ProfileInformation } from '@/src/components/ProfileDetailsComponents/ProfileInformation';
import { ProfileLinks } from '@/src/components/ProfileDetailsComponents/ProfileLinks';
import { ProfileTeams } from '@/src/components/ProfileDetailsComponents/ProfileTeams';

export const ProfileDetails: FC = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useGetProfileByIdQuery(id!);

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
			<Title order={2}>Profile Details</Title>
			<ProfileInformation email={data?.email} fullName={data?.fullName} nickname={data?.nickname} />
			<ProfileLinks links={data?.links} />
			<ProfileTeams teams={data?.teams} />
			<ProfileDetailsGamesStatistics />
		</PageLayout>
	);
};
