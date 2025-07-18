import type { FC } from 'react';

import { Stack, Text } from '@mantine/core';

import type { TournamentApplication as TournamentApplicationType } from '@/src/api/tournament';
import { TournamentApplication } from '@/src/pages/TournamentDetails/components/TournamentApplications/components/TournamentApplication';
import { vars } from '@/src/theme';

type TournamentApplicationsProps = {
	applications?: Array<TournamentApplicationType>;
};

export const TournamentApplications: FC<TournamentApplicationsProps> = ({ applications }) => {
	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Tournament Applications ({applications?.length || 0})
			</Text>
			{applications?.map((application) => (
				<TournamentApplication key={application.id} application={application} />
			))}
		</Stack>
	);
};
