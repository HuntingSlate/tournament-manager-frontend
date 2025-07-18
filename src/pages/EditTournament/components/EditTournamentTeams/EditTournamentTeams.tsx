import type { FC } from 'react';

import { Stack, Text } from '@mantine/core';

import type { Tournament } from '@/src/api/tournament';
import { EditTournamentTeam } from '@/src/pages/EditTournament/components/EditTournamentTeams/components';
import { vars } from '@/src/theme';

export type EditTournamentTeamsProps = {
	tournamentId?: number;
	tournament?: Tournament['participatingTeams'];
	maxTeams?: number;
};

export const EditTournamentTeams: FC<EditTournamentTeamsProps> = ({
	tournamentId,
	tournament,
	maxTeams,
}) => {
	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Participants {`(${tournament?.length}/${maxTeams})`}
			</Text>
			{tournament?.map((team) => (
				<EditTournamentTeam
					key={team.id}
					id={team.id}
					name={team.name}
					tournamentId={tournamentId!}
				/>
			))}
		</Stack>
	);
};
