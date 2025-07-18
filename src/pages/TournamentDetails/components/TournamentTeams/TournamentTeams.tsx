import type { FC } from 'react';

import { Stack, Text } from '@mantine/core';

import type { Tournament } from '@/src/api/tournament';
import { TournamentTeam } from '@/src/pages/TournamentDetails/components/TournamentTeams/components/TournamentTeam';
import { vars } from '@/src/theme';

export type TournamentTeamsProps = {
	tournament?: Tournament['participatingTeams'];
	maxTeams?: number;
};

export const TournamentTeams: FC<TournamentTeamsProps> = ({ tournament, maxTeams }) => {
	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Participants {`(${tournament?.length}/${maxTeams})`}
			</Text>
			{tournament?.map((team) => (
				<TournamentTeam key={team.id} id={team.id} name={team.name} />
			))}
		</Stack>
	);
};
