import type { FC } from 'react';

import { Button, Flex, Group, Stack, Text } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type TeamTournamentProps = {
	tournamentId: number;
	tournamentName: string;
	status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELED';
};

export const TeamTournament: FC<TeamTournamentProps> = ({
	tournamentId,
	tournamentName,
	status,
}) => {
	const navigate = useNavigate();

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex p={8} bg={vars.colors.yellow[2]} bdrs='50%'>
					<IconTrophy size={20} />
				</Flex>
				<Stack gap={0}>
					<Text size='md' fw={600}>
						{tournamentName}
					</Text>
					<Text size='xs'>{status}</Text>
				</Stack>
			</Group>
			<Button
				variant='subtle'
				size='sm'
				color='yellow'
				onClick={() =>
					navigate(RoutePaths.TournamentDetails.replace(':id', tournamentId.toString()))
				}
			>
				View Tournament
			</Button>
		</Group>
	);
};
