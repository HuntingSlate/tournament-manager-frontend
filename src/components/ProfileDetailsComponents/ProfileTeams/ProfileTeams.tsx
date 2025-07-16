import type { FC } from 'react';

import { Stack, Text } from '@mantine/core';

import type { Team } from '@/src/api/team';
import { ProfileTeam } from '@/src/components/ProfileDetailsComponents/ProfileTeams/components/ProfileTeam';
import { vars } from '@/src/theme';

type ProfileTeamsProps = {
	teams?: Array<Team>;
};

export const ProfileTeams: FC<ProfileTeamsProps> = ({ teams }) => {
	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Teams ({teams?.length || 0})
			</Text>
			<Stack gap={16}>
				{teams?.map((team) => (
					<ProfileTeam key={team.id} team={team} />
				))}
			</Stack>
		</Stack>
	);
};
