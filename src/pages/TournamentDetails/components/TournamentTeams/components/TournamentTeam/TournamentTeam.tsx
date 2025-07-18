import type { FC } from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

export type TournamentTeamProps = {
	id: number;
	name: string;
};

export const TournamentTeam: FC<TournamentTeamProps> = ({ id, name }) => {
	const navigate = useNavigate();
	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex style={{ padding: 12, backgroundColor: vars.colors.pink[1], borderRadius: '50%' }}>
					<IconUsersGroup size={32} />
				</Flex>
				<Text size='md' fw={600}>
					{name}
				</Text>
			</Group>
			<Button
				variant='subtle'
				color='blue'
				onClick={() => navigate(RoutePaths.TeamDetails.replace(':id', id.toString()))}
			>
				Team Details
			</Button>
		</Group>
	);
};
