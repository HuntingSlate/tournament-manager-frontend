import type { FC } from 'react';

import { Stack, Text } from '@mantine/core';

import type { TournamentApplication as TournamentApplicationType } from '@/src/api/tournament';
import { EditTournamentApplication } from '@/src/pages/EditTournament/components/EditTournamentApplications/components/EditTournamentApplication';
import { vars } from '@/src/theme';

type EditTournamentApplicationsProps = {
	applications?: Array<TournamentApplicationType>;
};

export const EditTournamentApplications: FC<EditTournamentApplicationsProps> = ({
	applications,
}) => {
	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Tournament Applications ({applications?.length || 0})
			</Text>
			{applications?.map((application) => (
				<EditTournamentApplication key={application.id} application={application} />
			))}
		</Stack>
	);
};
