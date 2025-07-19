import type { FC } from 'react';

import { Stack, Text } from '@mantine/core';

import { useWithdrawFromTournamentMutation } from '@/src/api/mutations/tournamentMutations';
import type { TournamentApplication } from '@/src/api/tournament';
import { TeamTournamentApplication } from '@/src/pages/TeamEdit/components/TeamTournamentApplications/components/TeamTournamentApplication';
import { vars } from '@/src/theme';

type TeamTournamentApplicationsProps = {
	applications?: Array<TournamentApplication>;
};

export const TeamTournamentApplications: FC<TeamTournamentApplicationsProps> = ({
	applications,
}) => {
	const { mutate, isPending } = useWithdrawFromTournamentMutation();

	const handleWithdraw = (applicationId: number, tournamentId: number) => {
		mutate({ tournamentId: tournamentId, applicationId: applicationId });
	};

	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Tournament Applications ({applications?.length || 0})
			</Text>
			{applications?.map((application) => (
				<TeamTournamentApplication
					key={application.id}
					application={application}
					onWithdrawClick={() => handleWithdraw(application.id, application.tournamentId)}
					onWithdrawPending={isPending}
				/>
			))}
		</Stack>
	);
};
